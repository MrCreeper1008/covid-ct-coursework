<?php
session_start();

use api\Response;
use db\DB;

require $_SERVER['DOCUMENT_ROOT'] . '/src/db/db.php';
require $_SERVER['DOCUMENT_ROOT'] . '/src/utils/mysql_timestamp.php';
require '../response.php';
require_once '../error.php';

function report_infection()
{
  $SERVER_ERROR_MESSAGE = 'An error occurred when recording your infection.';

  $db = DB::get_instance();

  $username = $_SESSION['username'];
  $infection_date = mysql_timestamp($_POST['infectionDate']);

  $query_str = file_get_contents('sql/report_infection.sql');
  $query = $db->prepare($query_str);
  $query->bind_param('ss', $username, $infection_date);

  $is_query_successful = $query->execute();

  if (!$is_query_successful) {
    Response::raise_internal_error($SERVER_ERROR_MESSAGE);
    return;
  }

  if ($query->affected_rows != 1) {
    Response::raise_internal_error($SERVER_ERROR_MESSAGE);
    return;
  }

  

  Response::success();
}
