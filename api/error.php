<?php

namespace api;

use JsonSerializable;

class ApiError implements JsonSerializable
{
  public function __construct(
    private $error,
  ) {}

  public function jsonSerialize()
  {
    return [
      "error" => $this->error,
    ];
  }
}
