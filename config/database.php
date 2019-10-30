<?php
$db_dsn = 'mysql:host=localhost;charset=utf8';
$db_user = 'root';
$db_pass = 'milo1999';
try {
	$db = new PDO($db_dsn, $db_user, $db_pass);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$db->query("CREATE DATABASE IF NOT EXISTS camagru CHARACTER SET utf8;
						USE camagru");
}
catch (PDOException $e) {
	echo "Database connection failed: " . $e->getMessage() . PHP_EOL;
	die();
}
?>
