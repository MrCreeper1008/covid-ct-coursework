<?php

require $_SERVER['DOCUMENT_ROOT'] . '/src/loader.php';
require '../error.php';

use api\Response;

load_env();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    require('report_infection.php');
    report_infection();
    break;

  default:
    Response::raise_unsupported_method_error();
    break;
}
