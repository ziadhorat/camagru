<header>
	<ul>
	<?php

	$root = "http://".$_SERVER['HTTP_HOST'].substr($_SERVER['SCRIPT_NAME'], 0, (strpos($_SERVER['SCRIPT_NAME'], "/", 1) + 1));
	echo "
		<li><a href='".$root."index.php'>Camera</a></li>
		<li><a href='".$root."public/gallery.php'>Gallery</a></li>";

		if (isset($_SESSION['logged']))
			echo "<li style='float:right'><a href='".$root."server/logout.php'>Logout</a></li>";
		else
			echo "<li style='float:right'><a href='".$root."'>Log in</a></li>";

	?>
	</ul>
</header>
