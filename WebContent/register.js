var xmlHttpRequest;

function sendWithGetMethod() {
  var userElement = document.getElementById("user");
  var pw1Element = document.getElementById("password1");
  var pw2Element = document.getElementById("password2");

  var url = "doGet?method=newAccount&user=" + userElement.value + "&password1=" + pw1Element.value+"d"+"&password2="+pw2Element.value+"d";

  //if (pw1Element.value != pw2Element.value || pw1Element.value == "" || pw2Element.value == "") {
    //var cauntionElement = document.getElementById("cauntion");
		xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.onreadystatechange = receive;
		xmlHttpRequest.open("GET", url, true);
		xmlHttpRequest.send(null);
		/*
    if (cauntionElement.childElementCount == 0) {
      var newElement = document.createElement("span");
      var newContent = document.createTextNode("2つのパスワードが違うか、空欄です。");
      newElement.appendChild(newContent);
      cauntionElement.appendChild(newElement);
    }
  } else {

    xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = receive;
    xmlHttpRequest.open("GET", url, true);
    xmlHttpRequest.send(null);
    window.location.href = "index.html";
		*/
  //}
}

function turnExpress() {
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
		if(output=="success"){
	    window.location.href = "index.html";

		}else if(output=="decline"){

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

window.addEventListener("load", function() {
  var expButtonElement = document.getElementById("exp_button");
  expButtonElement.addEventListener("click", turnExpress, false);

  var signupButtonElement = document.getElementById("signup_button");
  signupButtonElement.addEventListener("click", sendWithGetMethod, false);
}, false);
