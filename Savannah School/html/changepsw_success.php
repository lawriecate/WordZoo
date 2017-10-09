<?php
include_once 'includes/functions.php';
sec_session_start();
 
// Unset all session values 
$_SESSION = array();
 
// get session parameters 
$params = session_get_cookie_params();
 
// Delete the actual cookie. 
setcookie(session_name(),
        '', time() - 42000, 
        $params["path"], 
        $params["domain"], 
        $params["secure"], 
        $params["httponly"]);
 
// Destroy session 
session_destroy();
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Password changed Successfully</title>
        <link rel="stylesheet" href="styles/main.css" />
    </head>
    <body>
        <h1>Password has been changed successfully!</h1>
        <p> You are currently logged out.</p>
        <p>You can now go back to the <a href="index.php">login page</a> and log in</p>
    </body>
</html>