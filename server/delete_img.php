<?php

require_once('../config/database.php');

$img = $_POST['img'];

if ($img == NULL) {
  echo "Error : Unable to retrieve the image to delete";
  return ;
}
try {
  $db->query("DELETE FROM images WHERE link LIKE ".$db->quote('%'.$img));
  unlink("../".$img);
} catch (Exception $e) {
  echo "Error: Unable to delete the selected image";
}

?>
