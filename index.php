<?php
if (session_status() == PHP_SESSION_ACTIVE) {
  header('Location: ./home');
} else {
  header('Location: ./login');
}
