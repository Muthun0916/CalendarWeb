var frends_list = document.getElementById("groups")

const addcModal = document.getElementById('addModal');
const addfModal = document.getElementById('addMemberModal');

var memberSchedule = {};

var addButton = document.createElement("button");
addButton.className = "group_button";
var nameAddContent = "<span class='group_name'>   グループを追加   </span>";
var imgAddContent = "<img src='math_mark01_plus.png' width='70' height='70'>";
addButton.insertAdjacentHTML("afterbegin", imgAddContent);
addButton.insertAdjacentHTML("afterbegin", nameAddContent);
addButton.insertAdjacentHTML("afterbegin", imgAddContent);
frends_list.appendChild(addButton);
frends_list.appendChild(document.createElement("br"));


// URLを取得
let url = new URL(window.location.href);

// URLSearchParamsオブジェクトを取得
let params = url.searchParams;

function createGroupModal() {
  addcModal.style.display = 'block';
}

function close() {
  addcModal.style.display = 'none';
}

function hideElements() {
  var wrapper = document.getElementsByClassName("wrapper");
  for (var element of wrapper) {
    element.style.visibility = "hidden";
  }
  var member = document.getElementById("memberbox");
  member.style.visibility = "hidden";
}

function showElements(e) {
  var wrapper = document.getElementsByClassName("wrapper");
  for (var element of wrapper) {
    element.style.visibility = "visible";
  }
  var member = document.getElementById("memberbox");
  member.style.visibility = "visible";
  var dateMsg = document.getElementById("header");
  var dateElements = dateMsg.innerText.split(" ");
  dateMsg.innerText = dateElements[0] + " " + dateElements[1] + " " + this.gpname;
  loadMember(this.gpname);
}

//そのユーザーのグループ配列を取得
function loadGroup() {
  var url = "doGet?method=gpLoad&user=" + params.get("user");

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receive;
  xmlHttpRequest.open("GET", url, true);
  xmlHttpRequest.send(null);

}

//グループのメンバーを取得
function loadMember(name) {
  console.log("グループ名:" + name)
  var url = "doGet?method=loadMember&user=" + params.get("user") + "&groupName=" + name;

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receive;
  xmlHttpRequest.open("GET", url, true);
  xmlHttpRequest.send(null);

}

function loadSchedule(e) {
  //e.date:そのひとのスケジュール設定した日にち配列
  for (var date of Object.keys(e.dates)) {
    if (!memberSchedule[date]) {
      memberSchedule[date] = [];
    }
    memberSchedule[date].push(e.dates[date]);
  }
}

function addMemberModal() {
  addfModal.style.display = 'block';
}

function addMember() {
  var nameInput = document.getElementById("friendName");
  //ヘッダーからグループ名を取得
  var dateMsg = document.getElementById("header");
  var dateElements = dateMsg.innerText.split(" ");
  var url = "doGet?method=addMember&user=" + params.get("user") + "&groupName=" + dateElements[2] + "&memberName=" + nameInput.value;


  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receive;
  xmlHttpRequest.open("GET", url, true);
  xmlHttpRequest.send(null);
}

function addMemberLabel(name) {
  var memberElement = document.getElementById("member");
  var newMember = document.createElement("div");
  newMember.setAttribute("id", "member_content");
  newMember.insertAdjacentHTML("afterbegin", "<span id='member_name'>" + name + "</span>");
  newMember.insertAdjacentHTML("afterbegin", "<img src='favicon.png' width='50' height='50'>");
  memberElement.appendChild(newMember);
}
/*
for (var i = 0; i < 10; i++) {
  var memberElement = document.getElementById("member");
  var newMember = document.createElement("div");
  newMember.setAttribute("id", "member_content");
  newMember.insertAdjacentHTML("afterbegin", "<span id='member_name'>チェンバー</span>");
  newMember.insertAdjacentHTML("afterbegin", "<img src='favicon.png' width='50' height='50'>");

  memberElement.appendChild(newMember);
}
*/

function createGroup() {
  var nameInput = document.getElementById("groupName");
  var gpname = nameInput.value.replace(" ","　")
  addGroupButton(gpname);
  var url = "doGet?method=createGroup&user=" + params.get("user") + "&groupName=" + gpname;
  addcModal.style.display = 'none';
  nameInput.value = "";

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receive;
  xmlHttpRequest.open("GET", url, true);
  xmlHttpRequest.send(null);
}

function addGroupButton(name) {
  var gpButton = document.createElement("button");
  gpButton.className = "group_button";
  var nameContent = "<span className='group_button'>" + name + "</span>";
  //var imgContent = "<img src='favicon.png' width='70' height='70'>";
  gpButton.addEventListener("click", {
    gpname: name,
    handleEvent: showElements
  }, false);
  gpButton.insertAdjacentHTML("afterbegin", nameContent);
  //gpButton.insertAdjacentHTML("afterbegin",imgContent);
  frends_list.appendChild(gpButton);
  frends_list.appendChild(document.createElement("br"));

}
/*
for(var i=0;i<100;i++){
  var gpButton = document.createElement("button");
  gpButton.className = "group_button";
  var nameContent = "<span class='group_name'>チェンバーファン同好会</span>";
  var imgContent = "<img src='favicon.png' width='70' height='70'>";
  gpButton.insertAdjacentHTML("afterbegin",nameContent);
  gpButton.insertAdjacentHTML("afterbegin",imgContent);
  frends_list.appendChild(gpButton);
  frends_list.appendChild(document.createElement("br"));
}
*/

function receive() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
    var response = JSON.parse(xmlHttpRequest.responseText);
    var output = response.output;
    console.log(output)
    if (output == "success") {
      if (response.method == "addMember") {
        var nameInput = document.getElementById("friendName");
        addMemberLabel(nameInput.value);
        addfModal.style.display = 'none';
        nameInput.value = "";

      }

    } else if (output == "decline") {
      if (response.method == "addMember") {
        var nameInput = document.getElementById("friendName");
        //空欄確認、メンバー存在確認、メンバー既存追加確認
        var cauntionElement = document.getElementById("cauntion");
        if (cauntionElement.childElementCount == 0) {
          var newElement = document.createElement("span");
          var newContent = document.createTextNode("空欄か、そのユーザーが存在しないか、すでに追加されています。");
          newElement.appendChild(newContent);
          cauntionElement.appendChild(newElement);
        }
      }

    } else if (output == "gpLoad") {
      //文字列から配列へ変換
      var groups = response.groups.substring(1, response.groups.length - 1).split(",");
      if (groups != "")
        for (var group of groups)
          addGroupButton(group.trim());

    } else if (output == "memberLoad") {
      var memberElement = document.getElementById("member");
      while(memberElement.firstChild){
        memberElement.removeChild(memberElement.firstChild);
      }
      console.log(response.member)
      var member = response.member.substring(1, response.member.length - 1).split(",");
      if (member != "")
        for (var user of member)
          addMemberLabel(user);
    }


  }
}



window.addEventListener("load", function() {
  //グループ作成画面表示ボタン
  addButton.addEventListener("click", createGroupModal, false);
  var pekeaddButtonElement = document.getElementsByClassName('modalClose')[0];
  pekeaddButtonElement.addEventListener("click", close, false);
  //名前入力時に押してグループを作成するボタン
  var creategpButtonElement = document.getElementById("createGroupButton");
  creategpButtonElement.addEventListener("click", createGroup, false);
  var addMemberButtonElement = document.getElementById("addFriend");
  addMemberButtonElement.addEventListener("click", addMemberModal, false);
  var addMemberButtonElement = document.getElementById("addFriendButton");
  addMemberButtonElement.addEventListener("click", addMember, false);
  var myscheduleElement = document.getElementById("mypage");
  myscheduleElement.setAttribute('href',"mypage.html?user="+params.get("user"));
  hideElements();
  loadGroup();
}, false);

window.addEventListener('click', outsideClose);

function outsideClose(e) {
  if (e.target == addcModal) {
    addcModal.style.display = 'none';
  }
  if (e.target == addfModal) {
    addfModal.style.display = 'none';
  }
}
