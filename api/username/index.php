<?php

use api\Response;

session_start();

require '../response.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $response = new Response();

  $response
    ->set_status_code(200)
    ->set_data(['username' => $_SESSION['username']])
    ->send();
} else {
  Response::raise_unsupported_method_error();
}
