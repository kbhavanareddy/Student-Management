var tdata;
var nrows = 10;
var users = [];


$(document).ready(function () {

  if (!localStorage.allUsers) {
    jQuery.ajax({
      url: "    http://192.168.1.5:8080/studentdata.json",
      success: function (data) {

        localStorage.allUsers = JSON.stringify(data);
        users = JSON.parse(localStorage.allUsers);
        createTable(users, nrows);

      }
    });

   }
   else {
       
        users = JSON.parse(localStorage.allUsers);
        createTable(users, nrows);
    }
});




//selecting the number of students to display
function dropdown() {
    var x = $("#select option:selected").text();
    var a = parseInt(x);
    createTable(users, a);
  }



//creating table for students
function createTable(data, nrows) {

    $("#display").html('');
    
    tdata = '';

    for (i = 0; i < nrows; i++) {
        
        tdata += `<tr id="data_${i}">

        <td id="firstname_${i}">${data[i].firstname}</td>
        <td id="lastname_${i}">${data[i].lastname}</td>
        <td id="email_${i}">${data[i].email}</td>
        <td id="location_${i}">${data[i].location}</td>
        <td id="phone_${i}">${data[i].phone}</td>
        <td id="batch_${i}">${data[i].batch}</td>
        <td id="communication_${i}">${data[i].address.communication}</td>
        <td id="permanent_${i}">${data[i].address.permanent}</td>
        

        <td><input type="button" value = "more details" id="details_${i}" onclick="moredetails(this.id)"/></td>
        <td><input type="button" value = "delete" id="delete_${i}" onclick="deletes(this.id)"/></td>
        <td><input type="button" value = "edit" id="edit_${i}" onclick="editdetails(this.id)"/></td>

        </tr>`;
    }
    
    $("#display").html(`<table id="myTable" >
    <thead>
    <th>firstname</th>
    <th>lastname</th>
    <th>emailid</th>
    <th>location</th>
    <th>phone</th>
    <th>batch</th>
    <th>Communication address</th>
    <th>Permanent address</th>
    </thead>
    ${tdata}
    </table>`);

  }
  

//for more details of students
  function moredetails(id) {
     $(".videt").remove();
    var i = parseInt(id.split('_')[1]);
    var id1 = (id + "").replace("details", "data");
    var employee = users[i].previous_employer;
    var str = "";
    for (var key in employee) {
      str += key + ":" + employee[key] + ",";
    }
    console.log(str);
    document.getElementById(id1).insertAdjacentHTML("afterend", `<tr class="videt" > <td> ${str} </td> </tr>`);
  };





//for delete
function deletes(id) {
    var i = parseInt(id.split('_')[1]);
    var id1 = (id + "").replace("delete", "data");
    console.log(id1);
    document.getElementById(id1).remove();
    $(".videt").remove();
    users.splice(i,1);
    localStorage.allUsers = JSON.stringify(users);
  }

  



  //edit details
  function editdetails(id) {
    var i = parseInt(id.split('_')[1]);
    var id1 = (id).replace("edit", "data");
    // $("#edit_"+i).hide();
    var editdata = $("#" + id1).attr("contenteditable", true);
    console.log(id1);
    console.log(editdata);
    $("#edit_" + i).attr('value', 'Save');
    $("#edit_" + i).attr('onclick', 'savedata(this.id)');
  }




//saving the editted data
  function savedata(id) {

    var ind = parseInt(id.split('_')[1]);
    var firstname = document.getElementById(`firstname_${ind}`).innerHTML;
    var lastname = document.getElementById(`lastname_${ind}`).innerHTML;
    var email = document.getElementById(`email_${ind}`).innerHTML;
    var location = document.getElementById(`location_${ind}`).innerHTML;
    var phone = document.getElementById(`phone_${ind}`).innerHTML;
    var batch = document.getElementById(`batch_${ind}`).innerHTML;
    var permanent = document.getElementById(`permanent_${ind}`).innerHTML;
    var communication = document.getElementById(`communication_${ind}`).innerHTML;

    users[ind].firstname = firstname;
    users[ind].lastname = lastname;
    users[ind].email = email;
    users[ind].location = location;
    users[ind].phone = phone;
    users[ind].batch = batch;
    users[ind].address.permanent = permanent;
    users[ind].address.communication = communication;

    localStorage.allUsers = JSON.stringify(users);
    users = JSON.parse(localStorage.allUsers);

    $("#edit_" + ind).attr('value', 'Edit');
    $("#data_" + ind).attr("contenteditable",false);
    //  console.log("data_" + ind);
    $("#edit_" + ind).attr('onclick', 'editdetails(this.id)');
  }



//add data

function addStudent(){  
  var newstud = {};
  newstud.firstname = document.getElementById("firstname").value;
  newstud.lastname = document.getElementById("lastname").value;
  newstud.email = document.getElementById("email").value;
  newstud.location = [];
  newstud.location.push(document.getElementById("location").value);
  newstud.phone = document.getElementById("phone").value;
  newstud.batch = document.getElementById("batch").value;
  newstud.address ={};
  newstud.address.communication = document.getElementById("comm_addr").value;
  newstud.address.permanent = document.getElementById("perm_addr").value;
  newstud.previous_employer = {
      google: "Computer Programmer",
      facebook: "Frontend developer",
      linkedIn: "Software Engineer"
    };   
  users.push(newstud);

  console.log(users);

  localStorage.allUsers = JSON.stringify(users); 

  users = JSON.parse(localStorage.allUsers);   
  
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("location").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("batch").value = "";
  document.getElementById("comm_addr").value = "";
  document.getElementById("perm_addr").value = "";
 
}





//filter
function myFunction() {

  var input, filter, table, tr, td, i;
  input = document.getElementById("myinput");
  keyword = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {

    td1 = tr[i].getElementsByTagName("td")[0];
    td2 = tr[i].getElementsByTagName("td")[1];
    td3 = tr[i].getElementsByTagName("td")[2];
    td4 = tr[i].getElementsByTagName("td")[3];
    td5 = tr[i].getElementsByTagName("td")[4];
    td6 = tr[i].getElementsByTagName("td")[5];
    if (td1) {
      if (td1.innerHTML.toUpperCase().indexOf(keyword) > -1 || td2.innerHTML.toUpperCase().indexOf(keyword) > -1 || td3.innerHTML.toUpperCase().indexOf(keyword) > -1 || td4.innerHTML.toUpperCase().indexOf(keyword) > -1 || td5.innerHTML.toUpperCase().indexOf(keyword) > -1 || td6.innerHTML.toUpperCase().indexOf(keyword) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  
}
