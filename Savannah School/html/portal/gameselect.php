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
<html  style="height: 100%;">
    <head>
        <title>Game Selceting</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" charset="UTF-8"/>

        <link rel="stylesheet" href="main.css" />
        <script type="text/JavaScript" src="js/display_functions.js"></script> 

        <link rel="stylesheet" href="bootstrap-3.3.5-dist/css/bootstrap.min.css" />
        <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
        <script type="text/JavaScript" src="js/sha512.js"></script> 
        <script type="text/JavaScript" src="js/forms.js"></script> 
        <script type="text/JavaScript" src="bootstrap-3.3.5-dist/js/bootstrap.min.js"></script> 
    </head>
    <body style="height: 100%; background-color: #ACD6FF;" onresize="visibilityCheck()" onload="visibilityCheck()">
        <?php if (login_check($mysqli) == true) : ?>
                <table class="structure" style="height: 96%;">
                        <tr style="height: 10%; ">
                                <td class = "uon">
                                        &nbsp<img src="img/logo.png" width="33" height="45" class="logo">
                                </td>
                                <td>
                                        <b> 
                                                <?php
                                                        echo '<p>Currently logged ' . $logged . ' as ' . htmlentities($_SESSION['username']) . '.</p>';
                                                        echo '<p>Do you want to change user? <a href="includes/logout.php">Log out</a>.</p>';
                                                ?> 
                                        </b>  
                                </td>
                        </tr>
                        <tr>
                                <td colspan="2">
                                            <table class="mainForm" style="height: 100%;">
                                                        <tr style="height: 5%;">
                                                                <td colspan="4">
                                                                        &nbsp
                                                                </td>
                                                        </tr>
                                                        <tr style="height: 30%;">
                                                                <td style="width: 20%;">
                                                                        &nbsp
                                                                </td>
                                                                <td style="width: 30%;">
                                                                        <img src="img/zebra.png" alt = "zebra game" style="display:block;width:50%;">
                                                                </td>
                                                                <td style="width: 30%;">
                                                                        <img src="img/giraffe.png" alt = "giraffe game" style="display:block;width:50%;">
                                                                </td>
                                                                <td style="width: 20%;">
                                                                        &nbsp
                                                                </td>
                                                        </tr>
                                                        <tr style="height: 30%;">
                                                                <td style="width: 20%;">
                                                                        &nbsp
                                                                </td>
                                                                <td style="width: 30%;">
                                                                        <img src="img/lion.png" alt = "football game" style="display:block;width:50%;">
                                                                </td>
                                                                <td style="width: 30%;">
                                                                        <img src="img/elephant.png" alt = "elephant game" style="display:block;width:50%;">
                                                                </td>
                                                                <td style="width: 20%;">
                                                                        &nbsp
                                                                </td>
                                                         </tr> 
                                                         <tr>
                                                                <td colspan="4" align="center"><b><font size="15" color="white">Choose a game</font></b></td>
                                                         </tr>
                                            </table>
                                </td>
                       </tr>
                </table>
        <?php else : ?>
                <p>
                        <span class="error">You are not authorized to access this page.</span> Please <a href="index.php">login</a>.
                </p>
        <?php endif; ?>
    </body>
</html>