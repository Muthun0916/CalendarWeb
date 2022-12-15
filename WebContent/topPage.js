var xmlHttpRequest;

function sign_in() {
	var userElement = document.getElementById("user");
	var pwElement = document.getElementById("password");

	var url = "doGet?method=sign_in&user=" + userElement.value +"&password=" + pwElement.value+"d";

	console.log(userElement.value);
	console.log(pwElement.value);
	xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.onreadystatechange = receive;
	xmlHttpRequest.open("GET", url, true);
	xmlHttpRequest.send(null);

}

function sign_up(){
	window.location.href =　"register.html";
}

function receive() {
	if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
		var response = JSON.parse(xmlHttpRequest.responseText);
		var output = response.output;

		if(output=="success"){
			window.location.href =　"myPage.html?user="+response.user;
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
	var signupButtonElement = document.getElementById("sign_up_button");
	signupButtonElement.addEventListener("click",sign_up,false);
	var signinButtonElement = document.getElementById("sign_in_button");
	signinButtonElement.addEventListener("click",sign_in,false);
}, false);
