<?php

namespace external;

class WebService
{
  private static $SERVICE_URL = 'http://ml-lab-7b3a1aae-e63e-46ec-90c4-4e430b434198.ukwest.cloudapp.azure.com:60999/';

  public static function addReport(array $location)
  {
    return self::request('POST', '/report', $location);
  }

  private static function request(string $method, string $endpoint, array $input): array | bool
  {
    $req = curl_init(self::$SERVICE_URL . $endpoint);

    curl_setopt($req, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($req, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($req, CURLOPT_POSTFIELDS, json_encode($input));
    curl_setopt($req, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec($req);

    if (!$response) {
      return $response;
    }

    return json_decode($response);
  }
}
