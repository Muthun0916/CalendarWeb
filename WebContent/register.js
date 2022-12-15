var xmlHttpRequest;

function sendWithGetMethod() {
  var userElement = document.getElementById("user");
  var pw1Element = document.getElementById("password1");
  var pw2Element = document.getElementById("password2");

  var url = "doGet?method=sign_up&user=" + userElement.value + "&password1=" + pw1Element.value + "d" + "&password2=" + pw2Element.value + "d";

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receive;
  xmlHttpRequest.open("GET", url, true);
  xmlHttpRequest.send(null);

}

function showPassword() {
  var pw1Element = document.getElementById("password1");
  var pw2Element = document.getElementById("password2");

  if (pw1Element.type == "password") {
    pw1Element.type = "text";
    pw2Element.type = "text";
  } else {
    pw1Element.type = "password"
    pw2Element.type = "password"
  }
}

function receive() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
    var response = JSON.parse(xmlHttpRequest.responseText);

    var outputElement = document.getElementById("output");
    var output = response.output;
    if (output == "success") {
      window.location.href = "index.html";

    } else if (output == "decline") {

      var cauntionElement = document.getElementById("cauntion");
      if (cauntionElement.childElementCount == 0) {
        var newElement = document.createElement("span");
        var newContent = document.createTextNode("2つのパスワードが違うか、空欄です。");
        newElement.appendChild(newContent);
        cauntionElement.appendChild(newElement);
      }

    }
  }
}
var imageInput = document.getElementById('myImage');

// add an event listener for the 'change' event
imageInput.addEventListener('change', function(e) {
  // get a reference to the selected file
  var file = e.target.files[0];

  // create a new FileReader
  var reader = new FileReader();

  // add an event listener for the 'load' event
  reader.addEventListener('load', function(e) {
    // create a new image element and set its src attribute
    var img = new Image();
    img.src = e.target.result;

    // create a new canvas element and set its width and height
    var canvas = document.createElement('canvas');
    canvas.width = 124;
    canvas.height = 124;

    // draw the image on the canvas at the desired size
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 124, 124);

    // get the data URL of the resized image
    var dataURL = canvas.toDataURL();
    // get a reference to the #preview element
    var preview = document.getElementById('preview');
    preview.style.display = "block";
    preview.style.textAlign = "center";

    // set the src attribute of the #preview element
    preview.setAttribute('src', e.target.result);
  });

  // read the selected file as a data URL
  reader.readAsDataURL(file);
});

window.addEventListener("load", function() {
  var expButtonElement = document.getElementById("exp_button");
  expButtonElement.addEventListener("click", showPassword, false);

  var signupButtonElement = document.getElementById("sign_up_button");
  signupButtonElement.addEventListener("click", sendWithGetMethod, false);
}, false);
