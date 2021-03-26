<?php
require $_SERVER['DOCUMENT_ROOT'] . '/src/loader.php';
require $_SERVER['DOCUMENT_ROOT'] . '/src/db/db.php';
require $_SERVER['DOCUMENT_ROOT'] . '/src/config.php';
require '../response.php';
require '../error.php';
require 'save_login.php';

load_env();

use api\Response;
use api\ApiError;
use db\DB;

$db = DB::get_instance();

$query_str = file_get_contents('sql/user_query.sql');

$query = $db->prepare($query_str);

if (!$query) {
  Response::raise_internal_error("An error has occurred when logging in.");
  return;
}

$query->bind_param('s', $_POST['username']);
$query->execute();

$result = $query->get_result();

if (!$result) {
  Response::raise_internal_error("An error has occurred when logging in.");
  return;
}

$user = $result->fetch_assoc();

if (!$user) {
  $response = new Response();
  $error = new ApiError('Incorrect username.');

  $response
    ->set_status_code(401)
    ->set_data($error)
    ->send();

  return;
}

// verify the password
$is_password_correct = password_verify($_POST['password'], $user['pw']);

if (!$is_password_correct) {
  $response = new Response();
  $error = new ApiError('Incorrect password.');

  $response
    ->set_status_code(401)
    ->set_data($error)
    ->send();

  return;
}

save_login($user);

$response = new Response();

$response
  ->set_status_code(200)
  ->set_data($user)
  ->send();
