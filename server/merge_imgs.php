<?php

function decode_base64_img($img) {

  $start = strpos($img, "/") + 1;
  $end = strpos($img, ";");
  $img_type = substr($img, $start, $end - $start);
  $img = str_replace('data:image/'.substr($img, $start, $end - $start).';base64,', '', $img);
  $img = str_replace(' ', '+', $img);
  $img = base64_decode($img);
  return ($img);
}

function merge_imgs($img, $filter) {

  $img = decode_base64_img($img);
  $filter = decode_base64_img($filter);

  $src = imagecreatefromstring($filter);
  $dst = imagecreatefromstring($img);

  $src_width = imagesx($src);
  $src_height = imagesy($src);
  $dst_width = imagesx($dst);
  $dst_height = imagesy($dst);

  imagecopyresampled($dst, $src, 0, 0, 0, 0, $dst_width, $dst_height, $src_width, $src_height);

  ob_start();
  imagejpeg($dst);
  imagedestroy($src);
  imagedestroy($dst);
  $final_img = ob_get_clean();
  return ($final_img);
}

?>
