<?php

require $_SERVER['DOCUMENT_ROOT'] . '/src/loader.php';
require '../login/cookies.php';
require '../error.php';

use api\Response;

if (!isset($_COOKIE[$IS_LOGGED_IN])) {
  Response::raise_unauthorized_error();
  return;
}

load_env();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    require('report_infection.php');
    report_infection();
    break;

  case 'GET':
    require('get_infections.php');
    get_infections();
    break;

  default:
    Response::raise_unsupported_method_error();
    break;
}
