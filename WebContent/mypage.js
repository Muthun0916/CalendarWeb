

// URLを取得
let url = new URL(window.location.href);

// URLSearchParamsオブジェクトを取得
let params = url.searchParams;

const greetingMsg = function(){
  var hour = new Date().getHours();
  if(hour>=4&&hour<10){
    return "おはようございます!";
  }else if(hour>=10&&hour<17){
    return "こんにちは!";
  }else if(hour>=17&&hour<22){
    return "こんばんは!";
  }else if((hour>=22&&hour<24)||(hour>=0&&hour<4)){
    return "お疲れ様です!";
  }
}

var greetingElement = document.getElementById("title");
greetingElement.innerText=greetingMsg()+" "+params.get("user")+"さん";

var myscheduleElement = document.getElementById("my");
myscheduleElement.setAttribute('href',"myschedule.html?user="+params.get("user"));

var gpscheduleElement = document.getElementById("gp");
gpscheduleElement.setAttribute('href',"gpschedule.html?user="+params.get("user"));
