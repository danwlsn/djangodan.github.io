<?php

	$output = "cd /var/www/wilsonand1.github.io/ && git pull && jekyll build";

	if ($exec = shell_exec($output)) {
		echo $exec;
	}

?>