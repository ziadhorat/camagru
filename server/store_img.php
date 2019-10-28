<?php

session_start();

require_once('../config/database.php');
require_once('merge_imgs.php');

$user_id = $db->quote($_SESSION['logged']);
$dir = dirname(__FILE__, 2)."/images/upload/";

if ($user_id === "") {
  echo "Error: No user logged";
  return ;
}
if (empty($_POST['img']) || empty($_POST['filter'])) {
  echo "Error: Data missing";
  return ;
}
$img = merge_imgs($_POST['img'], $_POST['filter']);

$i = microtime();
$file = $dir."photo".$i.".jpeg";
while (file_exists($file) == true) {
  $i = microtime();
  $file = $dir."photo".$i.".jpeg";
}
if (file_put_contents($file, $img) == false)
  echo "Error: unable to create/write on file";
else {
  $db->query("INSERT INTO images (link, author_id)
              VALUES (".$db->quote($file).", $user_id)");
  echo ("images/upload/photo".$i.".jpeg");
}
?>
