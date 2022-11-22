

var frends_list = document.getElementById("groups")

for(var i=0;i<100;i++){
  var gpButton = document.createElement("button");
  gpButton.className = "group_button";
  var nameContent = "<span class='group_name'>チェンバーファン同好会</span>";
  var imgContent = "<img src='favicon.png' width='70' height='70'>";
  gpButton.insertAdjacentHTML("afterbegin",nameContent);
  gpButton.insertAdjacentHTML("afterbegin",imgContent);
  //gpButton.appendChild(gpContent);
  frends_list.appendChild(gpButton);
  frends_list.appendChild(document.createElement("br"));
}

for(var i=0;i<10;i++){
  var memberElement = document.getElementById("member");
  var newMember = document.createElement("div");
  newMember.setAttribute("id","member_content");
  newMember.insertAdjacentHTML("afterbegin","<span id='member_name'>チェンバー</span>");
  newMember.insertAdjacentHTML("afterbegin","<img src='favicon.png' width='50' height='50'>");

  memberElement.appendChild(newMember);
}


window.addEventListener("load", function() {


}, false);
