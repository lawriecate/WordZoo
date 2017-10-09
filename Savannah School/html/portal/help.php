<?php
include_once '../includes/db_connect.php';
include_once '../includes/functions.php';
 
sec_session_start();
 
?>
<!DOCTYPE html>
<html lang="en" style="min-height: 979px;">
  <head>
    <meta charset="utf-8">
    <title>Portal Help</title>
	<link rel="shortcut icon" href="/../img/favicon.ico" type="image/x-icon">
	<link rel="icon" href="/../img/favicon.ico" type="image/x-icon">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <script type="text/javascript" src="js/jquery-1.12.0.min.js"></script>
	<script type="text/javascript" src="js/chart.js"></script>
    <link rel="stylesheet" href="main.css"
	
	<script type="text/javascript" src="js/jquery-1.12.0.min.js"></script>
  </head>
  <body>
    <div class="container">
	    	<div class="header">
	    		<a href = "/index.php"><img src="../img/logo.png" class="logo"></a>
				<div class ="username">
					<center><?php
						 echo htmlentities($_SESSION['username']);
                    ?> </center>
				</div>
	    		<div class="pullright">
					 <a href="../includes/logout.php"><p>Logout</p></a>
				</div>
				</p>
	    	</div>
	    	<div class="content">
			<?php if (login_check($mysqli) == true) : ?>
				<!--Add Check to ensure it is also a teacher username -->
					<div class ="sidebar">
						<center>
						<a href = "index.php" ><img src="img/home.png" id="sidebarButton" ></a>
						<a href = "addStudents.php" ><img src="img/addStudents.png" id="sidebarButton" ></a>
						<a href = "studentInformation.php" ><img src="img/studentInfo.png" id="sidebarButton"></a>
						<a href = "classInformation.php" ><img src="img/classInfo.png" id="sidebarButton"></a>
						<a href = "../gameselect.php" ><img src="img/games.png" id="sidebarButton"></a>
						<a href = "help.php" ><img src="img/help.png" id="sidebarButton" ></a>
						</center>
					</div>
                       <div class ="col1">
							<div class ="controls">
                                <h1> Help:</h1>
							</div>
							<div class = "helpBody">
								Insert Text Explanation here about doing basic tasks, plus images etc.
							</div>
						</div>	
			<?php else : ?>
                <center><p>
                        <span class="error">You are not authorized to access this page.</span> Please <a href="../index.php">login</a>.
                </p></center>
			<?php endif; ?>		
			</div>
	</div>		
  </body>
</html>