<?php
include_once 'includes/db_connect.php';
include_once 'includes/functions.php';
 
sec_session_start();
 
if (login_check($mysqli) == true) {
    $logged = 'in';
} else {
    $logged = 'out';
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Confirm Password</title>
	<link rel="shortcut icon" href="/img/favicon.ico" type="image/x-icon">
	<link rel="icon" href="/img/favicon.ico" type="image/x-icon">
	 <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <script type="text/JavaScript" src="js/display_functions.js"></script> 
    <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script type="text/JavaScript" src="js/sha512.js"></script> 
    <link rel="stylesheet" href="main.css">
	<script type="text/JavaScript" src="js/forms.js"></script> 
    <style type="text/css">
    </style>
  </head>
  <body>
    <div class="container">
	    	<div class="header">
	    		<a href = "/index.php"><img src="img/logo.png" class="logo"></a>
	    	</div>
	    	<div class="content">
	    		<div class="col1 col">
	    			<div class="animal giraffe" id = "giraffe">
				       <img src="img/giraffe.png">
			        </div>
	    		</div>
	    		<div class="col col2">
		    		<div class="form ">
					<form action="includes/process_changepsw.php" method="post" name="changepsw_form">
						<input type="hidden" name="username" value="<?php echo htmlentities($_SESSION['username']); ?>" />
						<font size="5" color="white">New Password:</font> <br></br><input type="password" name="newpassword" id="newpassword" onkeydown="if(event.keyCode==13){formhash(this.form, this.form.newpassword)};"><br></br><br></br>
						<input type="button" value="Change password" onclick="formhash(this.form, this.form.newpassword);" />
					</form>
		        	</div>
		        	<div class="animal lion">
			        	<img src="img/lion.png" id = "lion" >
		        	</div>
		        </div>
	        	<div class="col col3">
	        		 <div class="animal elephant">
			        	<img src="img/elephant.png" id = "elephant" >
			        </div>
	        		<div class="animal zebra">
	        			<img src="img/zebra.png" id = "zebra" >
			        </div>
	        	</div>
        	</div>
    </div>  
  </body>
</html>