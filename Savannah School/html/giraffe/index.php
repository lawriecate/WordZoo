<?php
include_once '../includes/db_connect.php';
include_once '../includes/functions.php';
 
sec_session_start();
 
?>
<!DOCTYPE html>
<html lang="en" style="min-height: 979px;">
  <head>
    <meta charset="utf-8">
    <title>Giraffe Game</title>
	<link rel="shortcut icon" href="/../img/favicon.ico" type="image/x-icon">
	<link rel="icon" href="/../img/favicon.ico" type="image/x-icon">
	 <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="main.css">
	<!-- Game Files -->
	<script type="text/javascript" src="js/phaser.js"></script>
	<script type="text/javascript" src="js/states/boot.js"></script>
	<script type="text/javascript" src="js/states/gameover.js"></script>
	<script type="text/javascript" src="js/states/menu.js"></script>
	<script type="text/javascript" src="js/states/play.js"></script>
	<script type="text/javascript" src="js/states/preload.js"></script>
	<script type="text/javascript" src="js/states/difficulty.js"></script>
	<script type="text/javascript" src="js/states/rules.js"></script>
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
					<script type="text/javascript" src="js/main.js" id="game"></script>
					<div id="Giraffegame"></div>
					<center><a href="index22.php"><img src="../img/fullscreen.png" id="fullscreen" ></a></center>
			<?php else : ?>
                <center><p>
                        <span class="error">You are not authorized to access this page.</span> Please <a href="../index.php">login</a>.
                </p></center>
			<?php endif; ?>		
			</div>
	</div>		
  </body>
</html>