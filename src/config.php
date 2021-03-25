<?php

/**
 * login expires if the user has not logged in in a week.
 */
$LOGIN_EXPIRATION = time() + 3600 * 24 * 7;

/**
 * Settings expires after a year.
 */
$SETTINGS_EXPIRATION = time() + 3600 * 24 * 7 * 4 * 12;
