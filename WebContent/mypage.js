

// URLを取得
let url = new URL(window.location.href);

// URLSearchParamsオブジェクトを取得
let params = url.searchParams;

var greetingElement = document.getElementById("title");
greetingElement.innerText="ようこそ！"+params.get("user")+"さん";

var myscheduleElement = document.getElementById("my");
myscheduleElement.setAttribute('href',"myschedule.html?user="+params.get("user"));

var gpscheduleElement = document.getElementById("gp");
gpscheduleElement.setAttribute('href',"gpschedule.html?user="+params.get("user"));
