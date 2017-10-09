<?php
include_once '../includes/db_connect.php';
include_once '../includes/functions.php';
 
sec_session_start();
 
if (login_check($mysqli) == true) {
    $logged = 'in';
} else {
    $logged = 'out';
}
?>




<!doctype html> 
<html lang="en"> 
<head> 
	<meta charset="UTF-8" />
    <title>Zebra Game</title>
    <link rel="stylesheet" href="../main.css" />
	<script type="text/javascript" src="js/phaser.js"></script>
	<script type="text/javascript" src="js/states/boot.js"></script>
	<script type="text/javascript" src="js/states/gameover.js"></script>
	<script type="text/javascript" src="js/states/menu.js"></script>
	<script type="text/javascript" src="js/states/play.js"></script>
	<script type="text/javascript" src="js/states/preload.js"></script>
	<script type="text/javascript" src="js/states/difficulty.js"></script>
	<script type="text/javascript" src="js/states/rules.js"></script>
	<script type="text/javascript" src="js/jquery-1.12.0.min.js"></script>

    <style type="text/css">
        body {
            margin: 0;
        }
    </style>
</head>
<body style="height: 100%; background-color: #ACD6FF;" onresize="visibilityCheck()" onload="visibilityCheck()">
         
	<?php if (login_check($mysqli) == true) : ?>
			<script type="text/javascript" src="js/main.js" ></script>
	<?php else : ?>
                <p>
                        <span class="error">You are not authorized to access this page.</span> Please <a href="../index.php">login</a>.
                </p>
        <?php endif; ?>

</body>
</html>