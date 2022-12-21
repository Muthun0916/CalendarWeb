var xmlHttpRequest;

function sign_in() {
  var userElement = document.getElementById("user");
  var pwElement = document.getElementById("password");

  //var url = "doGet?method=sign_in&user=" + userElement.value +"&password=" + pwElement.value+"d";

  console.log(userElement.value);
  console.log(pwElement.value);
  var formData = new FormData();
  formData.append("user", userElement.value);
  formData.append("password", pwElement.value + "d");
  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receive;
  xmlHttpRequest.open("POST", "doGet?method=sign_in", true);
  xmlHttpRequest.send(formData);

}

function sign_up() {
  window.location.href = "register.html";
}

function post(path, params, method = 'post') {

  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}

function receive() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
    var response = JSON.parse(xmlHttpRequest.responseText);
    var output = response.output;

    if (output == "success") {
      window.location.href = "myPage.html?user=" + response.user + (response.news != "" ? "&news=" + response.news : "");
      //post("myPage.html",{user:response.user});
    } else if (output == "decline") {
      var cauntionElement = document.getElementById("cauntion");
      if (cauntionElement.childElementCount == 0) {
        var newElement = document.createElement("span");
        var newContent = document.createTextNode("ユーザーデータが存在しないか、パスワードが違います。");
        newElement.appendChild(newContent);
        cauntionElement.appendChild(newElement);
      }
    }
  }
}

window.addEventListener("load", function() {
  var signupButtonElement = document.getElementById("sign_up_button");
  signupButtonElement.addEventListener("click", sign_up, false);
  var signinButtonElement = document.getElementById("sign_in_button");
  signinButtonElement.addEventListener("click", sign_in, false);
}, false);
