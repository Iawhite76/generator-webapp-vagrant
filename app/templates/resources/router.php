<?php 

	$f3 = require('resources/classes/base.php');
	$f3->route('GET /',
	  function() {
	    include 'pages/home.php';
	  }
	);

	$f3->route('GET /about',
	  function() {
	    include 'pages/about.php';
	  }
	);

	$f3->route('GET /sample-page',
	  function() {
	    include 'pages/sample-page.php';
	  }
	);

	$f3->run();

?>