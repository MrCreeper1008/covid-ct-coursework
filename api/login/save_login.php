<?php

require('cookies.php');

function save_login(array $user)
{
  global $IS_LOGGED_IN;

  setcookie($IS_LOGGED_IN, true, 0, '/');
  session_start();
  $_SESSION['username'] = $user['username'];
}
