<?php

use api\Response;

require $_SERVER['DOCUMENT_ROOT'] . '/src/config.php';
require '../response.php';
require 'cookies.php';

function save_settings()
{
  $SERVER_ERROR_MESSAGE = 'An error occurred when saving your settings.';

  global $WINDOW_COOKIE;
  global $DISTANCE_COOKIE;
  global $SETTINGS_EXPIRATION;

  $cookie_options = [
    'expires' => $SETTINGS_EXPIRATION,
    'samesite' => 'Strict',
  ];

  if (isset($_POST['window'])) {
    $window = $_POST['window'];

    if (!setcookie($WINDOW_COOKIE, $window, $cookie_options)) {
      Response::raise_internal_error($SERVER_ERROR_MESSAGE);
      return;
    }
  }

  if (isset($_POST['distance'])) {
    $distance = $_POST['distance'];

    if (!setcookie($DISTANCE_COOKIE, $distance, $cookie_options)) {
      Response::raise_internal_error($SERVER_ERROR_MESSAGE);
      return;
    }
  }

  Response::success();
}
