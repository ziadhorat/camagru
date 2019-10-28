<?php

session_start();

require_once("../config/database.php");
require_once("send_mail.php");

$response = "";
$login = $_POST["login"];
$passwd = hash("whirlpool", $_POST["passwd"]);
$email = $_POST["email"];

$query = $db->query("SELECT COUNT(login) FROM users WHERE login = ".$db->quote($login));
$res = $query->fetch();
if ($res[0] > 0)
  $response .= "Username ".$login." already exists.<br/>";
$query = $db->query("SELECT COUNT(email) FROM users WHERE email = ".$db->quote($email));
$res = $query->fetch();
if ($res[0] > 0)
  $response .= "Email address ".$email." already exists.<br/>";
if ($response !== "")
  echo ($response);
else {
  $token = bin2hex(random_bytes(16));
  if (send_confirmation_mail($login, $email, $token) == true) {
    $db->query("INSERT INTO users (login, password, email, confirm_hash)
                VALUES (".$db->quote($login).", ".$db->quote($passwd).", ".$db->quote($email).", ".$db->quote($token).")");
  }
  else {
    echo "An error occured while sending the confirmation email, please try again.<br/>";
  }
}

?>
