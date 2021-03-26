<?php

require '../login/cookies.php';
require '../settings/cookies.php';

session_start();
session_destroy();
setcookie($IS_LOGGED_IN, null, time() - 3600, '/');
setcookie($WINDOW_COOKIE, null, time() - 3600, '/');
setcookie($DISTANCE_COOKIE, null, time() - 3600, '/');

header('Location: /login');
