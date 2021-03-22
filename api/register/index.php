<?php

require $_SERVER['DOCUMENT_ROOT'] . '/src/loader.php';
require $_SERVER['DOCUMENT_ROOT'] . '/src/config.php';
require $_SERVER['DOCUMENT_ROOT'] . '/src/db/db.php';
require '../response.php';
require '../error.php';
require '../login/save_login.php';

use api\Response;
use api\ApiError;
use db\DB;

$PASSWORD_HASH_OPTION = [
  "cost" => 10,
];

/**
 * The error message that will be returned when an internal server error occurs.
 */
$SERVER_ERROR_MESSAGE = "An error has occurred during registration.";

load_env();

$db = DB::get_instance();

$username = $_POST['username'];
$password = $_POST['password'];
$first_name = $_POST['name'];
$surname = $_POST['surname'];

// first, check if user exists
$query_string = file_get_contents('sql/user_exists.sql');
$query = $db->prepare($query_string);

if (!$query) {
  Response::raise_internal_error($SERVER_ERROR_MESSAGE);
  return;
}

$query->bind_param('s', $username);
$query->execute();

$result = $query->get_result();

if (!$result) {
  Response::raise_internal_error($SERVER_ERROR_MESSAGE);
  return;
}

$count = $result->fetch_row();

if ($count[0] > 0) {
  $response = new Response();
  $error = new ApiError("An account with the same username already exists. Please use another username.");

  $response
    ->set_status_code(409)
    ->set_data($error)
    ->send();

  return;
}

$hashed_password = password_hash($password, PASSWORD_BCRYPT, $PASSWORD_HASH_OPTION);

if (!$hashed_password) {
  Response::raise_internal_error($SERVER_ERROR_MESSAGE);
  return;
}

$query_string = file_get_contents('sql/register.sql');
$query = $db->prepare($query_string);
$query->bind_param('ssss', $first_name, $surname, $username, $hashed_password);

if (!$query->execute()) {
  Response::raise_internal_error($SERVER_ERROR_MESSAGE);
  return;
}

$result = $query->get_result();

if (!$result) {
  Response::raise_internal_error($SERVER_ERROR_MESSAGE);
  return;
}

$user = $result->fetch_assoc();

save_login($user, $LOGIN_EXPIRATION);

$response = new Response();

$response
  ->set_status_code(200)
  ->set_data($user)
  ->send();
