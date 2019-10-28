<?php

session_start();

require_once("../config/database.php");
require_once("send_mail.php");

$login = $db->quote($_POST["login"]);
$email = $_POST["email"];

$query = $db->query("SELECT password, email FROM users WHERE login = $login AND email = ".$db->quote($email));
$res = $query->fetch();
if ($res == NULL)
  echo "Invalid username/email address.<br/>";
else {
  $new_passwd = bin2hex(random_bytes(5));
  $hash_passwd = $db->quote(hash("whirlpool", $new_passwd));
  if (send_resetpass_mail($new_passwd, $email) == true)
    $db->query("UPDATE users SET password = $hash_passwd WHERE login = $login");
  else
    echo "An error occured while sending the email, please try again.<br/>";
}
