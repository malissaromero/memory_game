// document.getElementById('photoInput').addEventListener('change', readURL, true);
// function readURL() {
//    var file = document.getElementById("photoInput").files[0];
//    var reader = new FileReader();
//    reader.onloadend = function(){
//       document.getElementById('photo').style.backgroundImage = "url(" + reader.result + ")";
//    }
//    if(file) {
//       reader.readAsDataURL(file);
//     } else {
//     }
// }

// var submit = document.getElementsByClassName('submit')[0];
//
// submit.onclick = function() {
//   var relativeName = document.getElementById('relativeInput').value;
//   document.getElementsByClassName('name')[0].innerHTML = relativeName;
//   relativeName.innerHTML = "";
// }

$('.addUserData').on('click', addUserData);

function addUserData (event) {
  event.preventDefault();

  var errorCount = 0;
  $('.addUserDataInput input').each(function(index, value) {
    if ($(this).val() === '') {
      errorCount++;
    }
  });
  if (errorCount === 0) {
    var newUserData = {
      'user': $('#nameInput').val(),
      'relativeName': $('#relativeInput').val(),
      'photo': $('#photoInput').val()
    }

    console.log(newUserData)

    $.ajax({
      type: 'POST',
      data: newUserData,
      url: '/users',
      dataType: 'JSON'
    }).done(function(response) {
      // if (response.message === '') {
      $('.addUserDataInput input').val('');
      // populateTable();
      // console.log(populateTable())
      // } else {
      //   console.log('Error: ' + response.message);
      // }
    });
  } else {
    console.log('Please fill in all fields');
    return false;
  }
};

$.ajax({
  type: 'GET',
  url: '/users',
  dataType: 'JSON'
}).done(function(response) {
  var userData = response[0];
  console.log(userData.user)
  $('.card1').append("<a href="+ userData.photo + "></a>" + "<h1>" + userData.name + "<h1>")

  $('.delete').on('click', deleteData);

  function deleteData (){
    $.ajax({
      type: 'DELETE',
      url: '/users/' + response[0],
      dataType: 'JSON',
      success: function(result) {
        console.log("deleted")
      }
    })
  }

})
