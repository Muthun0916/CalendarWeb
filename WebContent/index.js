var xmlHttpRequest;

function sendWithGetMethodLogin() {
	var userElement = document.getElementById("user");
	var pwElement = document.getElementById("password");

	var url = "doGet?method=login&user=" + userElement.value +"&password=" + pwElement.value+"d";

	console.log(userElement.value);
	console.log(pwElement.value);
	xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.onreadystatechange = receive;
	xmlHttpRequest.open("GET", url, true);
	xmlHttpRequest.send(null);

}

function sendWithGetMethodSignup(){
	window.location.href =　"register.html";
}

function receive() {
	if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
		var response = JSON.parse(xmlHttpRequest.responseText);
		var output = response.output;

		if(output=="success"){
			window.location.href =　"mypage.html?user="+response.user;
		}else if(output=="decline"){
			var cauntionElement = document.getElementById("cauntion");
			if(cauntionElement.childElementCount==0){
				var newElement = document.createElement("span");
				var newContent = document.createTextNode("ユーザーデータが存在しないか、パスワードが違います。");
				newElement.appendChild(newContent);
				cauntionElement.appendChild(newElement);
			}
		}


	}
}

window.addEventListener("load", function() {
	var signupButtonElement = document.getElementById("signup_button");
	signupButtonElement.addEventListener("click",sendWithGetMethodSignup,false);
	var loginButtonElement = document.getElementById("login_button");
	loginButtonElement.addEventListener("click",sendWithGetMethodLogin,false);
}, false);
