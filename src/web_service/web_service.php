<?php

namespace external;

use CurlHandle;

class WebService
{
  private static $SERVICE_URL = 'http://ml-lab-7b3a1aae-e63e-46ec-90c4-4e430b434198.ukwest.cloudapp.azure.com:60999/';

  private static $MOCK_SERVICE_URL = 'host.docker.internal:8080';

  public static function new_request(string $method, string $endpoint, array $input): CurlHandle
  {
    $req = curl_init();

    curl_setopt(
      $req,
      CURLOPT_URL,
      $_ENV['PHP_ENV'] === 'prod'
        ? self::$SERVICE_URL . $endpoint
        : self::$MOCK_SERVICE_URL . $endpoint . '_mock.php'
    );
    curl_setopt($req, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($req, CURLOPT_HEADER, true);
    curl_setopt($req, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($req, CURLOPT_POSTFIELDS, json_encode($input));
    curl_setopt($req, CURLOPT_RETURNTRANSFER, 1);

    return $req;
  }
}
