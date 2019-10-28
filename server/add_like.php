<?php

session_start();

require_once("../config/database.php");

$user_id = $db->quote($_SESSION['logged']);
$img_id = $db->quote($_POST['img_id']);
$comment = $db->quote(htmlspecialchars($_POST['comment'], ENT_QUOTES));

if ($user_id === "''") {
  echo "You must be logged in to like/comment photos.<br/>";
  die();
}
if ($img_id == "''") {
  echo "An error occured - Incomplete request.<br/>";
  die();
}

$query = $db->query("SELECT img_id FROM images WHERE img_id = $img_id");
$res = $query->fetch();
if ($res == NULL) {
  echo "The photo doesn't exists or has been removed.<br/>";
  die();
}

$query = $db->query("SELECT like_id FROM likes WHERE img_id = $img_id AND author_id = $user_id");
$res = $query->fetch();
if ($res == NULL) {
  $db->query("INSERT INTO likes (img_id, author_id) VALUES ($img_id, $user_id)");
  $db->query("UPDATE images SET nb_likes = nb_likes + 1 WHERE img_id = $img_id");
  echo "+1";
}
else {
  $db->query("DELETE FROM likes WHERE img_id = $img_id AND author_id = $user_id");
  $db->query("UPDATE images SET nb_likes = nb_likes - 1 WHERE img_id = $img_id");
  echo "-1";
}

?>
