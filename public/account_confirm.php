<?php session_start(); ?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
    <style>
      body {
        text-align:center;
      }
    </style>
		<title>Camagru - account validation</title>
	</head>
	<body>
    <h3>
      <br/>
<?php

require_once("../config/database.php");

$error = "Please try to use again the link sent by email. If the problem persists, contact the webmaster via the 'About' page".PHP_EOL;

if (empty($_GET['login']) || empty($_GET['token']))
  $error = "Corrupted link.".PHP_EOL.$error;
else {
  $login = $db->quote(trim($_GET['login']));
  $token = trim($_GET['token']);
  $query = $db->query("SELECT login, confirm_hash FROM users WHERE login = $login");
  $result = $query->fetch();
  if ($result == null)
    $error = "Corrupted link.".PHP_EOL.$error;
  else if ($result['confirm_hash'] === "")
    $error = "This account has already been activated.".PHP_EOL;
  else if ($result['confirm_hash'] !== $token)
    $error = "Corrupted link.".PHP_EOL.$error;
  else {
    $error = "";
    $db->query("UPDATE users SET confirm_hash = '' WHERE login = $login");
    echo ("Your account is now active !<br/>Click <a href='../index.php'>here</a> to sign in.");
  }
}
  if ($error !== "")
    echo ($error);

?>
    </h3>
  </body>
</html>
