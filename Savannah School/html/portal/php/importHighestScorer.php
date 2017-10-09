<?php
//Chnage SQL to only import a batch of words
include_once '../../includes/functions.php';

sec_session_start();

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
	
	$sql = "SELECT DISTINCT username FROM $tableName WHERE difficulty = $difficultyInput AND username = ANY(SELECT studentUsername FROM students WHERE teacherID = (SELECT teacherID FROM teachers WHERE username = '$username'))";

	$query = mysql_query($sql,$conn);

	$arrayResults = array();
	
	while ($row = mysql_fetch_array($query, MYSQL_ASSOC)) {
		$arrayResults[] = array($row['username']);
	}
	
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');

	echo json_encode($arrayResults);
?>
