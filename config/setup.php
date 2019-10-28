<?php

require('database.php');

// Database structure creation via PDO instance
$db->query("CREATE TABLE IF NOT EXISTS users
					(
						user_id INT(6) PRIMARY KEY AUTO_INCREMENT NOT NULL,
						login VARCHAR(40) UNIQUE NOT NULL,
						password VARCHAR(255) NOT NULL,
						email VARCHAR(128) UNIQUE NOT NULL,
						confirm_hash VARCHAR(255) NOT NULL
					)");

$db->query("CREATE TABLE IF NOT EXISTS images
					(
						img_id INT(6) PRIMARY KEY AUTO_INCREMENT NOT NULL,
						link TEXT NOT NULL,
						pub_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
						author_id INT(6) NOT NULL,
						nb_likes INT(6) NOT NULL DEFAULT 0
					)");

$db->query("CREATE TABLE IF NOT EXISTS comments
					(
						com_id INT(6) PRIMARY KEY AUTO_INCREMENT NOT NULL,
						img_id INT(6) NOT NULL,
						author_id INT(6) NOT NULL,
						content MEDIUMTEXT NOT NULL
					)");

$db->query("CREATE TABLE IF NOT EXISTS likes
					(
						like_id INT(6) PRIMARY KEY AUTO_INCREMENT NOT NULL,
						img_id INT(6) NOT NULL,
						author_id INT(6) NOT NULL
					)");
?>
