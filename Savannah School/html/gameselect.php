<?php
include_once 'includes/db_connect.php';
include_once 'includes/functions.php';
 
sec_session_start();
 
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Game Select</title>
	<link rel="shortcut icon" href="/../img/favicon.ico" type="image/x-icon">
	<link rel="icon" href="/../img/favicon.ico" type="image/x-icon">
	 <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <script type="text/JavaScript" src="js/display_functions.js"></script> 
    <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script type="text/JavaScript" src="js/sha512.js"></script> 
    <link rel="stylesheet" href="gameselect.css">
	<script type="text/JavaScript" src="js/forms.js"></script> 
    <style type="text/css">
    </style>
  </head>
  <body>
    <div class="container">
	    	<div class="header">
	    		<a href = "/index.php"><img src="img/logo.png" class="logo"></a>
				<div class ="username">
					<center><?php
						 echo htmlentities($_SESSION['username']);
                    ?> </center>
				</div>
	    		<div class="pullright">
					 <a href="includes/logout.php"><p>Logout</p></a>
				</div>
				</p>
	    	</div>
	    	<div class="content">
			<?php if (login_check($mysqli) == true) : ?>
			<center><div class = "select">
	    			<div class = "col col1">
						<a href="giraffe/index.php"><img src="img/selectGiraffe.png" id = "giraffe" ></a>
						<a href="zebra/index.php"><img src= "img/selectZebra.png"id = "zebra" ></a>
					</div>
					<div class = "col col2">
						<a href="lion/index.php"><img src="img/selectLion.png" id = "lion" ></a>
						<a href="elephant/index.php"><img src="img/selectElephant.png" id = "elephant" ></a>
					</div>
				</div>
        	</div></center>
    </div>
	<?php else : ?>
                <center><p>
                        <span class="error">You are not authorized to access this page.</span> Please <a href="index.php">login</a>.
                </p></center>
        <?php endif; ?>
		
  </body>
</html>