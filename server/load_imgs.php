<?php

session_start();

require_once('../config/database.php');

function is_image($file) {
  if ((strpos($file, ".") < 1))
    return (false);
  if (($dot_index = strrpos($file, ".")) < 1)
    return (false);
  $file_extension = substr($file, $dot_index + 1);
  if (strtolower($file_extension) === "png")
    return (true);
  return (false);
}

function load_filters() {
  $dir = "../images/filters/";

  if (($fd = opendir($dir)) !== false) {
    while (($file = readdir($fd)) !== false) {
      if (is_image($file) === true)
        $res .= "<img class='filters' src='images/filters/$file' onclick='add_filter(this)' style='cursor: pointer'>";
    }
    closedir($fd);
    return ($res);
  }
  return (false);
}

$user_id = $db->quote($_SESSION['logged']);
$response = "";

if ($user_id === "") {
  echo "Unable to retrieve the session user.<br/>";
  return ;
}

$query = $db->query("SELECT link FROM images WHERE author_id = $user_id ORDER BY img_id DESC LIMIT 10");
while (($res = $query->fetchColumn()) !== false) {
  $start = strrpos($res, "/");
  $img = substr($res, $start, strlen($res) - $start);
  $response .= "<img class='photos' src='images/upload$img' onclick='delete_img(this)'>";
}
if ($response === "") {
  $response = "<img id='photo_default' class='photos' src='images/icons/photo_default.jpg' width='640' height='480'>";
}
$response .= "\0";
if (($filters = load_filters()) !== false)
  $response .= $filters;
echo ($response);

?>
