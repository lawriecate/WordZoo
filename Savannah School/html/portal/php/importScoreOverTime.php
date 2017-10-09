<?php
include_once '../../includes/functions.php';

sec_session_start();

//Chnage SQL to only import a batch of words
	$servername = "localhost";
	$username = "shared";
	$password = "bGQdzrpJnNf6YrFh";
	$dbname = "main";
	
	// Create connection
	$conn = mysql_connect($servername, $username, $password, $dbname)  or
	die("Could not connect: " . mysql_error());
	mysql_select_db($dbname);
	
     $username = $_SESSION['username'];
	$gameName = $_GET['gameName'];
	$difficulty = $_GET['difficulty'];
	
	$difficultyInput = "'".$difficulty."'";

	//Convert gameName to lower case and append with "sessions" to gain table name
	$tableName = strtolower($gameName);
	$tableName .= 'sessions';
	$sql = "SELECT AVG(score) ,dateTime FROM $tableName WHERE difficulty = $difficultyInput AND username = ANY(SELECT studentUsername from students where teacherId = (SELECT teacherID from teachers where username = '$username')) GROUP BY CAST(dateTime AS DATE)";

	$query = mysql_query($sql,$conn);

	$arrayResults = array();
	
	while ($row = mysql_fetch_array($query, MYSQL_ASSOC)) {
		$arrayResults[] = array($row['AVG(score)'],$row['dateTime']);
	}
	
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');

	echo json_encode($arrayResults);
?>
