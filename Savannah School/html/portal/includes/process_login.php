<?php
include_once 'db_connect.php';
include_once 'functions.php';
 
sec_session_start(); // Our custom secure way of starting a PHP session.

if (isset($_POST['username'], $_POST['p'])) {
    $username = $_POST['username'];
    $password = $_POST['p']; // The hashed password.
 
    if (login($username, $password, $mysqli) == true) {
    	 // Login success
	//Check if username contains Teacher
	//Note that you need to compare with the !== operator. If you use != 
	//or <> and the '.' is found at position 0, hey! 0 compares equal to
	//FALSE and you lose
	if(strpos($username, 'teacher')!== FALSE){
		header('Location: ../generate_account.php');
	} else {
                             if ($stmt = $mysqli->prepare("SELECT time FROM successful_login_attempts  WHERE user_id = ? ")) {
                                    $stmt->bind_param('i', htmlentities($_SESSION['user_id']));
                                    $stmt->execute();
                                    $stmt->store_result();
                                    if ($stmt->num_rows == 1) {
                                            header('Location: ../changepsw.php');
                                    }
                                    else{
                                            header('Location: ../gameselect.php');
                                    }
                             }
                }
    } else {
        // Login failed 
        header('Location: ../index.php?error=1');
    }
} else {
    // The correct POST variables were not sent to this page. 
    echo 'Invalid Request';
}