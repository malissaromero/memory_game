document.getElementById('photoInput').addEventListener('change', readURL, true);
function readURL() {
   var file = document.getElementById("photoInput").files[0];
   var reader = new FileReader();
   reader.onloadend = function(){
      document.getElementById('photo').style.backgroundImage = "url(" + reader.result + ")";
   }
   if(file) {
      reader.readAsDataURL(file);
    } else {
    }
}

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
      'user': $('.addUserDataInput fieldset input .nameInput').val(),
      'relativeName': $('.addUserDataInput fieldset input .relativeInput').val(),
      'photo': $('addUserDataInput fieldset input .photoInput').val()
    }

    $.ajax({
      type: 'POST',
      data: newUserData,
      url: '/users/adduserdata',
      dataType: 'JSON'
    }).done(function(response) {
      if (response.message === '') {
        $('.addUserDataInput fieldset input').val('');
        populateTable();
      } else {
        alert('Error: ' + response.message);
      }
    });
  } else {
    alert('Please fill in all fields');
    return false;
  }
};
