window.onload = function(){

var elem = document.getElementsByClassName("button")[0];

elem.onclick = function clickHandler() {
  console.log("click");

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // document.getElementById('').innerHTML = xhr.responseText;
    }
  };
  xhr.open('GET', 'https://graph.facebook.com/bgolub?fields=id,name,picture');
  xhr.send();
}
}
