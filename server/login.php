<?php

session_start();

require_once('../config/database.php');

$response = "";
$login = $_POST["login"];
$passwd = $db->quote(hash("whirlpool", $_POST["passwd"]));

$query = $db->query("SELECT user_id, login, password, confirm_hash FROM users
                    WHERE login = ".$db->quote($login)." AND password = $passwd");
$res = $query->fetch();
if ($res == NULL)
  $response = "Invalid username/password.<br/>";
else if ($res['confirm_hash'] !== "") {
  $response = "Your account is not active yet. Please check your inbox for the activation email.<br/>";
}
else
  $_SESSION['logged'] = $res['user_id'];
if ($response !== "")
  echo ($response);
?>
