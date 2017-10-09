<?php

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
    <title>Generate account</title>
    <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script type="text/JavaScript" src="js/sha512.js"></script> 
    <script type="text/JavaScript" src="js/forms.js"></script> 
    
  </head>
  <body onload="load();">
        <?php 
                 if (login_check($mysqli) == true) {
                        echo '<p>Currently logged ' . $logged . ' as ' . htmlentities($_SESSION['username']) . '.</p>';
                        echo '<p>Do you want to change user? <a href="includes/logout.php">Log out</a>.</p>';
                 } else {
                        echo '<p>Currently logged ' . $logged . '.</p>';
         }?>

         <h1>Generate Account</h1>
        <form action="includes/register.inc.php" 
                   method="post" 
                   name="registration_form">
        	<input type="hidden" name="tname" value="<?php echo htmlentities($_SESSION['username']); ?>" id="tname">          
        	Firstname:<input type="text" name="firstname" id="firstname"/>
        	<br/><br/>
        	Lastname:<input type="text" name="lastname" id="lastname"/>
        	<br/><br/>
        	<input type="button" value="Generate account" onclick="generateAccount(this.form, this.form.firstname, this.form.lastname);" />
        	<br/><br/>
        	Username:<input type="text" name="username" value="" id="username" readonly="true" style="background-color:#C0C0C0;" />
        	<br/><br/>
        	Password:<input type="text" name="password" value="" id="psw" readonly="true" style="background-color:#C0C0C0;"/>
        	<br/><br/>
             <input type="hidden" name="pswid" value="" id="pswid">    
        	<input type="button" 
                         value="Register" 
                         onclick="regformhash(this.form, this.form.username, this.form.password);" /> 
      </form>

      <h1>Show your students and their initial password</h1>
      <button onclick="list();" > List </button>
      <table id="studentsList" border="1"><tr><td>username</td><td>forename</td><td>surname</td><td>initial password</td></tr></table> 

      <h1>Change a student's password</h1>
      <form action="includes/process_changepsw.php" method="post" name="changepsw_form">
                Select a student: <select id="namelist" name="username"></select><br/>
                New Password: <input type="password" name="newpassword" id="newpassword"/>
                <input type="button" value="Change password" onclick="formhash(this.form, this.form.newpassword);" />
      </form>
  </body>
</html>