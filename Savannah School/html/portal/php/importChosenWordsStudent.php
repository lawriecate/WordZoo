<?php
//Chnage SQL to only import a batch of words
	$servername = "localhost";
	$username = "shared";
	$password = "bGQdzrpJnNf6YrFh";
	$dbname = "main";
	
	// Create connection
	$conn = mysql_connect($servername, $username, $password, $dbname)  or
	die("Could not connect: " . mysql_error());
	mysql_select_db($dbname);
	
	$gameName = $_GET['gameName'];
	$difficulty = $_GET['difficulty'];
	$word = $_GET['word'];
	$username = $_GET['username'];
    
	$difficultyInput = "'".$difficulty."'";

	//Convert gameName to lower case and append with "sessions" to gain table name
	$tableName = strtolower($gameName);
	$tableName .= 'sessions';
	
	if($gameName == "Zebra") {
		$sql = "SELECT chosen1 FROM $tableName WHERE difficulty = $difficultyInput AND failed1 = '$word' AND username = '$username'";
		$query = mysql_query($sql,$conn);
		$arrayResults1 = array();
		while ($row = mysql_fetch_array($query, MYSQL_ASSOC)) {
			$arrayResults1[] = array($row['chosen1']);
		}
		$sql = "SELECT chosen2 FROM $tableName WHERE difficulty = $difficultyInput AND failed2 = '$word' AND username = '$username'";
		$query = mysql_query($sql,$conn);
		$arrayResults2 = array();
		while ($row = mysql_fetch_array($query, MYSQL_ASSOC)) {
			$arrayResults2[] = array($row['chosen2']);
		}
		$sql = "SELECT chosen3 FROM $tableName WHERE difficulty = $difficultyInput AND failed3 = '$word' AND username = '$username'";
		$query = mysql_query($sql,$conn);
		$arrayResults3 = array();
		while ($row = mysql_fetch_array($query, MYSQL_ASSOC)) {
			$arrayResults3[] = array($row['chosen3']);
		}
		$arrayResults = array_merge($arrayResults1, $arrayResults2, $arrayResults3);
	} else {
		$sql = "SELECT chosen,failed FROM $tableName WHERE difficulty = $difficultyInput  AND username = '$username'";
		$query = mysql_query($sql,$conn);
		$arrayResults = array();
		while ($row = mysql_fetch_array($query, MYSQL_ASSOC)) {
			$arrayResults[] = array($row['chosen'], $row['failed']);
		}
	}
	
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');

	echo json_encode($arrayResults);
?>
