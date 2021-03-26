<?php
session_start();

use api\Response;
use db\DB;
use external\WebService;

require $_SERVER['DOCUMENT_ROOT'] . '/src/db/db.php';
require $_SERVER['DOCUMENT_ROOT'] . '/src/web_service/web_service.php';
require '../settings/cookies.php';
require '../response.php';

function get_infections()
{
  $SERVER_ERROR_MESSAGE = 'An error occurred when retrieving contact information.';

  global $WINDOW_COOKIE;
  global $DISTANCE_COOKIE;

  $db = DB::get_instance();

  $username = $_SESSION['username'];
  $window = intval($_COOKIE[$WINDOW_COOKIE]);
  $distance_threshold = intval($_COOKIE[$DISTANCE_COOKIE]);

  $infected_visit_query_string = file_get_contents('sql/get_infections.sql');
  $infected_visit_query = $db->prepare($infected_visit_query_string);
  $infected_visit_query->bind_param('ii', $window, $window);

  $is_query_successful = $infected_visit_query->execute();

  if (!$is_query_successful) {
    Response::raise_internal_error($SERVER_ERROR_MESSAGE);
    return;
  }

  $infected_visit_query_result = $infected_visit_query->get_result();

  if (!$infected_visit_query_result) {
    Response::raise_internal_error($SERVER_ERROR_MESSAGE);
    return;
  }

  $user_visits_query_string = file_get_contents('sql/get_user_visits_in_window.sql');
  $user_visits_query = $db->prepare($user_visits_query_string);
  $user_visits_query->bind_param('si', $username, $window);

  $is_query_successful = $user_visits_query->execute();

  if (!$is_query_successful) {
    Response::raise_internal_error($SERVER_ERROR_MESSAGE);
    return;
  }

  $user_visits_query_result = $user_visits_query->get_result();

  if (!$user_visits_query_result) {
    Response::raise_internal_error($SERVER_ERROR_MESSAGE);
    return;
  }

  $user_visits = [];

  while ($row = $user_visits_query_result->fetch_assoc()) {
    array_push($user_visits, [
      'x' => $row['location_x'],
      'y' => $row['location_y'],
    ]);
  }

  $visits = [];

  $infection_req = WebService::new_request('GET', '/infections', '?ts=' . $window * 7);

  $infections = json_decode(curl_exec($infection_req), true);

  foreach ($infections as $infection) {
    $has_contact = false;
    foreach ($user_visits as $user_visit) {
      if (distance($user_visit, $infection) <= $distance_threshold) {
        $has_contact = true;
        break;
      }
    }

    array_push($visits, [
      'x' => $infection['x'],
      'y' => $infection['y'],
      'contacted' => $has_contact,
    ]);
  }

  while ($row = $infected_visit_query_result->fetch_assoc()) {
    $visit_location = [
      'x' => $row['location_x'],
      'y' => $row['location_y'],
    ];

    $has_contact = false;
    foreach ($user_visits as $user_visit) {
      if (distance($user_visit, $visit_location) <= $distance_threshold) {
        $has_contact = true;
        break;
      }
    }

    array_push($visits, $visit_location + [
      'contacted' => $has_contact,
    ]);
  }

  $response = new Response();

  $response
    ->set_status_code(200)
    ->set_data($visits)
    ->send();
}

function distance(array $p1, array $p2): bool
{
  return sqrt(pow($p1['x'] - $p2['x'], 2) + pow($p1['y'] - $p2['y'], 2));
}
