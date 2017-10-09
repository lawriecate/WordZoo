var random_psw;
var members;
var students;

function formhash(form, password) {
     if (password.value == '') {
        alert('You must provide all the requested details. Please try again');
        return false;
     }
    // Create a new element input, this will be our hashed password field. 
    var p = document.createElement("input");
 
    // Add the new element to our form. 
    form.appendChild(p);
    p.name = "p";
    p.type = "hidden";
    p.value = hex_sha512(password.value);
 
    // Make sure the plaintext password doesn't get sent. 
    password.value = "";
 
    // Finally submit the form. 
    form.submit();
}

function regformhash(form, uid, password) {
     // Check each field has a value
    if (uid.value == ''         || 
        password.value == '') {
        alert('You must provide all the requested details. Please try again');
        return false;
    }
    // Create a new element input, this will be our hashed password field. 
    var p = document.createElement("input");
 
    // Add the new element to our form. 
    form.appendChild(p);
    p.name = "p";
    p.type = "hidden";
    p.value = hex_sha512(password.value);
 
    // Make sure the plaintext password doesn't get sent. 
    password.value = "";
    // Finally submit the form. 
    form.submit();
    return true;
}

function generateAccount(form, firstname, lastname){
    if (firstname.value == '' || 
        lastname.value == '') {
        alert('You must provide all the requested details. Please try again');
        return false;
    }
        var rand = parseInt(Math.random()*random_psw.length);
        this.document.getElementById("psw").value = random_psw[rand][0];
        this.document.getElementById("pswid").value = random_psw[rand][1];

        var username = this.document.getElementById("tname").value.substring(7,this.document.getElementById("tname").value.length) + 
                       firstname.value.toString().substring(0,1)   + 
                       lastname.value.toString().substring(0,1);
        var num = 0;
        while (!usernameCheck(members, username)) {
            num = num + 1;
            if(num != 1){
                  username = username.substring(0,username.length-String(num).length) + num;
            }
            else{
                  username = username + num;
            }
        }
        this.document.getElementById("username").value = username;
}

function usernameCheck(members, username) {
    for (var i = 0; i < members.length; i++) {
        if (members[i][0] == username) {
            return false;
        }
    }
    return true;
}

function load(){
    this.document.getElementById("firstname").value = "";
    this.document.getElementById("lastname").value = "";
    this.document.getElementById("username").value = "";
    this.document.getElementById("psw").value = "";
    this.document.getElementById("pswid").value = "";
    setTeacherID();
    generatePSW();
    loadUsername();
    loadStudents();
    initSelection();
}

function generatePSW() {
   var returnedArray;
   $.ajax({
      method: 'get',
      url: 'includes/generate_psw.php',
      dataType: 'json',
      async: false,
      success: function(data) {     
        random_psw = data;
      }
    });
}

function loadUsername(){
    var returnedArray;
    $.ajax({
      method: 'get',
      url: 'includes/load_username.php',
      dataType: 'json',
      async: false,
      success: function(data) {     
        members = data;
      }
    });
}

function loadStudents(){
    var returnedArray;
   $.ajax({
      method: 'get',
      url: 'includes/load_students.php',
      dataType: 'json',
      async: false,
      success: function(data) {     
        students = data;
      }
    });
}

function setTeacherID(){
    var returnedArray;
   var teachers;
   var username = this.document.getElementById("tname").value;
   $.ajax({
      method: 'get',
      url: 'includes/load_teachers.php',
      dataType: 'json',
      async: false,
      success: function(data) { 
        teachers = data;
      }
    });
   for (var i = 0; i < teachers.length; i++) {
     if (teachers[i][0] == username) {
        this.document.getElementById("teacherid").value = teachers[i][1];
        break;
     }
   }
}

function list(){
  for (var i = 0; i<students.length; i++) {
    if (students[i][4]==this.document.getElementById("teacherid").value) {
      var initpsw;
      for (var j = 0; j < random_psw.length; j++) {
        if (random_psw[j][1] == students[i][3]) {
            initpsw = random_psw[j][0];
            break;
        }
      }
      $("table").append("<tr><td>" + students[i][0] + "</td><td>" + students[i][1] + "</td><td>" + students[i][2] + "</td><td>" + initpsw + "</td></tr>");
    }
  }
}

function initSelection(){
  for (var i = 0; i<students.length; i++) {
    if (students[i][4]==this.document.getElementById("teacherid").value) {
        var option;
        option = document.createElement("option");
        option.appendChild(document.createTextNode(students[i][0]));
        this.document.getElementById("namelist").appendChild(option);  
    }
  }
}
