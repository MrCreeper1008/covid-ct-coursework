<?php

require $_SERVER['DOCUMENT_ROOT'] . '/src/loader.php';
require '../login/cookies.php';
require '../response.php';

use api\Response;

if (!isset($_COOKIE[$IS_LOGGED_IN])) {
  Response::raise_unauthorized_error();
  return;
}

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $response = new Response();

  $response
    ->set_status_code(200)
    ->set_data(['username' => $_SESSION['username']])
    ->send();
} else {
  Response::raise_unsupported_method_error();
}
