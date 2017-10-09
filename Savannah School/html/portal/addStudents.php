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
<html>
  <head>
    <meta charset="UTF-8">
    <title>Portal Add Students</title>
    <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script type="text/JavaScript" src="js/sha512.js"></script> 
    <script type="text/JavaScript" src="js/forms.js"></script> 
	    <link rel="stylesheet" href="main.css"
    
  </head>
  <body onload="load(); list();">
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
						<div class = "row1">
							<h1>Generate Account</h1>
							<form action="includes/register.inc.php" 
									   method="post" 
									   name="registration_form">
								<input type="hidden" name="tname" value="<?php echo htmlentities($_SESSION['username']); ?>" id="tname">          
								<label for="contact"><span>Firstname:</span><input type="text" name="firstname" id="firstname" maxlength="15"/></label>
								<label for="contact"><span>Surname:</span><input type="text" name="lastname" id="lastname" maxlength="15"/></label>
								<input type="button" value="Generate account" onclick="generateAccount(this.form, this.form.firstname, this.form.lastname);" />
								<label for="contact"><span>Username:</span><input type="text" name="username" value="" id="username" readonly="true" style="background-color:#C0C0C0;" /></label>
								<label for="contact"><span>Password:</span><input type="text" name="password" value="" id="psw" readonly="true" style="background-color:#C0C0C0;"/></label>
								 <input type="hidden" name="pswid" value="" id="pswid"> 
                                <input type="hidden" name = "teacherid" value="" id="teacherid">
								<input type="button" 
											 value="Register" 
											 onclick="regformhash(this.form, this.form.username, this.form.password);" /> 
						  </form>
						</div>
						<div class = "row2">
					  <h1>Show Student's Usernames and Initial Passwords</h1>
					  <center><table id="studentsList" border="1"><tr><td>Username</td><td>Forename</td><td>Surname</td><td>Initial password</td></tr></table></center> 
						</div>
						<div class = "row3">
					  <h1>Change a student's password</h1>
					  <form action="includes/process_changepsw.php" method="post" name="changepsw_form">
								Select a student: <select id="namelist" name="username"></select><br/>
								New Password: <input type="password" name="newpassword" id="newpassword"/>
								<input type="button" value="Change password" onclick="formhash(this.form, this.form.newpassword);" />
					  </form>
					  </div>
					</div>
			<?php else : ?>
                <center><p>
                    <span class="error">You are not authorized to access this page.</span> Please <a href="../index.php">login</a>.
                </p></center>
			<?php endif; ?>
		</div>	
  </body>
</html>