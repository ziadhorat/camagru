<?php	session_start(); ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1">
		<link rel="stylesheet" type="text/css" href="../stylesheets/global.css">
		<link rel="stylesheet" type="text/css" href="../stylesheets/banners.css">
		<link rel="stylesheet" type="text/css" href="../stylesheets/main.css">
		<link rel="stylesheet" type="text/css" href="../stylesheets/gallery.css">
		<title>Camagru - Gallery</title>
	</head>
	<body>
	<?php
		include('header.php');
		include('footer.php');
	?>
  <main>
		<h1>Gallery</h1>
		<p id='gallery_main_msg' class='error_msg'></p>
		<div id='publications_container'></div>
		<button id='see_more'>See more<br/><br/>V<br/>V</button>
		<p id='see_more_msg' class='error_msg'></p>
	</main>
	<script src='../js/gallery.js'></script>
	</body>
</html>
