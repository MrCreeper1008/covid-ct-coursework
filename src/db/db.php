<?php

namespace db;

use mysqli;

/**
 * A singleton that allows access to website database.
 */
class DB
{
  private static mysqli | null $instance = null;

  public static function get_instance()
  {
    if (self::$instance == null) {
      self::$instance = new mysqli('db', $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME']);
    }

    mysqli_report(MYSQLI_REPORT_ERROR);

    return self::$instance;
  }
}
