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
	$difficulty = $_GET['difficulty'];
	$chosen1 = $_GET['chosen1'];
	$chosen2 = $_GET['chosen2'];
	$chosen3 = $_GET['chosen3'];
	$failed1 = $_GET['failed1'];
	$failed2 = $_GET['failed2'];
	$failed3 = $_GET['failed3'];
	$time = $_GET['time'];

	$sql = "INSERT INTO zebrasessions (username, score, time, difficulty, chosen1, failed1, chosen2, failed2, chosen3, failed3, dateTime)
	 VALUES ('$username', $score, '$time', '$difficulty', '$chosen1', '$failed1', '$chosen2', '$failed2', '$chosen3', '$failed3', '$date')";

	if (mysqli_query($conn, $sql)) {
	    echo "New record created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}

	mysqli_close($conn);
 ?> 