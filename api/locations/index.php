<?php

use api\Response;

include 'get_locations.php';
include 'add_location.php';
include '../error.php';

load_env();
session_start();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    get_locations();
    break;

  case 'POST':
    add_location();
    break;

  default:
    Response::raise_unsupported_method_error();
    break;
}
