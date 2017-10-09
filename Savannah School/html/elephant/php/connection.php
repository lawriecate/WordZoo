<?php
include_once '../../includes/functions.php';

sec_session_start();

	$servername = "localhost";
	$username = "shared";
	$password = "bGQdzrpJnNf6YrFh";
	$dbname = "main";

	// Create connection
	 $conn = mysqli_connect($servername, $username, $password, $dbname);
	 // Check connection
	 if (!$conn) {
	     die("Connection failed: " . mysqli_connect_error());
	}

	$timezone = date_default_timezone_set('Europe/London');
	$date = date('Y/m/d H:i:s', time());
	
	$username = $_SESSION['username'];
	$score = $_GET['score'];
	$time = $_GET['time'];
	$difficulty = $_GET['difficulty'];
	$chosen = $_GET['chosen'];
	$failed = $_GET['failed'];
	$responseTime = $_GET['responseTime'];

	$sql = "INSERT INTO elephantsessions (username, score, time, difficulty, chosen, failed, responseTime, dateTime)
	 VALUES ('$username', $score, '$time', '$difficulty', '$chosen', '$failed', '$responseTime', '$date')";

	if (mysqli_query($conn, $sql)) {
	    echo "New record created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}

	mysqli_close($conn);
 ?> 