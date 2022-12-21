const greetingMsg = function() {
  var hour = new Date().getHours();
  if (hour >= 4 && hour < 10) {
    return "おはようございます!";
  } else if (hour >= 10 && hour < 17) {
    return "こんにちは!";
  } else if (hour >= 17 && hour < 22) {
    return "こんばんは!";
  } else if ((hour >= 22 && hour < 24) || (hour >= 0 && hour < 4)) {
    return "お疲れ様です!";
  }
}



window.addEventListener("load", function() {

  // URLを取得
  let url = new URL(window.location.href);

  // URLSearchParamsオブジェクトを取得
  let params = url.searchParams;

  var greetingElement = document.getElementById("title");
  greetingElement.innerText = greetingMsg() + " " + params.get("user") + "さん";

  var newsElement = document.getElementById("news");
  if(params.get("news"))
    newsElement.innerText = params.get("news");

  var myScheduleElement = document.getElementById("my");
  myScheduleElement.setAttribute('href', "mySchedule.html?user=" + params.get("user"));

  var groupScheduleElement = document.getElementById("gp");
  groupScheduleElement.setAttribute('href', "groupSchedule.html?user=" + params.get("user"));

  var managementElement = document.getElementById("mn");
  managementElement.setAttribute('href', "management.html?user=" + params.get("user"));


}, false);
