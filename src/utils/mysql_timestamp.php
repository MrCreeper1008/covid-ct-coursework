<?php

function mysql_timestamp(string $timestamp): string
{
  return date('Y-m-d H:i:s', intval($timestamp));
}
