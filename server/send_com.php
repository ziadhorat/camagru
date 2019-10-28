<?php

session_start();

require_once("../config/database.php");

$user_id = $db->quote($_SESSION['logged']);
$img_id = $db->quote($_POST['img_id']);
$comment = $db->quote(htmlspecialchars($_POST['comment'], ENT_QUOTES));

if ($user_id === "''") {
  die();
}

if ($img_id === "''" || $comment === "''") {
  echo "An error occured - Incomplete request.<br/>";
  die();
}

$query = $db->query("SELECT img_id FROM images WHERE img_id = $img_id");
$res = $query->fetch();

if ($res == NULL) {
  echo "The photo doesn't exists or has been removed.<br/>";
  die();
}
$query = $db->query("SELECT login FROM users WHERE user_id = $user_id");
$res = $query->fetch();

$db->query("INSERT INTO comments (img_id, author_id, content)
            VALUES ($img_id, $user_id, $comment)");
echo ("OK_".$res['login']);

?>
