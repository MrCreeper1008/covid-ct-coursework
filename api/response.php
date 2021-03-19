<?php

namespace api;

use JsonSerializable;

/**
 * A RESTful JSON response object.
 */
class Response
{
  private int $status_code;
  private JsonSerializable | array $data;

  public static function raise_internal_error(string $message)
  {
    $response = new Response();
    $error = new ApiError($message . " Please try again later.");

    $response
      ->set_status_code(500)
      ->set_data($error)
      ->send();
  }

  public static function raise_unsupported_method_error()
  {
    $response = new Response();
    $error = new ApiError('Unsupported method ' . $_SERVER['REQUEST_METHOD'] . ' at this endpoint.');

    $response
      ->set_status_code(405)
      ->set_data($error)
      ->send();
  }

  public static function success()
  {
    $response = new Response();

    $response
      ->set_status_code(200)
      ->set_data([])
      ->send();
  }

  /**
   * Sets the HTTP status of this response.
   */
  public function set_status_code(int $code)
  {
    $this->status_code = $code;
    return $this;
  }

  public function set_data(JsonSerializable | array $data)
  {
    $this->data = $data;
    return $this;
  }

  public function send()
  {
    http_response_code($this->status_code);
    header('Content-Type: application/json');
    echo json_encode($this->data);
  }
}
