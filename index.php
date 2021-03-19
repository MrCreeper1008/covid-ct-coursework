<?php
if ($_SESSION['username']) {
  header('Location: ./home');
} else {
  header('Location: ./login');
}
