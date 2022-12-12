var frends_list = document.getElementById("groups")

const addcModal = document.getElementById('addModal');
const addfModal = document.getElementById('addMemberModal');

var changes = {};
var type = "a";
var groupName = "";

const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);
var days = 0;
var scheduleMap = {};
var changes = {};

const modal = document.getElementById('easyModal');

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
  groupName = name
  console.log("グループ名:" + name)
  var url = "doGet?method=loadMember&user=" + params.get("user") + "&groupName=" + name;

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receive;
  xmlHttpRequest.open("GET", url, true);
  xmlHttpRequest.send(null);
  //loadSchedule();
}

function loadSchedule() {
  //ヘッダーからグループ名を取得
  var dateMsg = document.getElementById("header");
  var dateElements = dateMsg.innerText.split(" ");
  var url = "doGet?method=gpscheduleGet&user=" + params.get("user") + "&groupName=" + dateElements[2];

  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receive;
  xmlHttpRequest.open("GET", url, true);
  xmlHttpRequest.send(null);

  /*
  //e.date:そのひとのスケジュール設定した日にち配列
  for (var date of Object.keys(e.dates)) {
    if (!memberSchedule[date]) {
      memberSchedule[date] = [];
    }
    memberSchedule[date].push(e.dates[date]);
  }
  */
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
  var gpname = nameInput.value.replace(" ", "　")
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

//mapのvalueがmapのネスト
function reviver(key, value) {
  return typeof value === "object" ? new Map(Object.entries(value)) : value;
}

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
        loadSchedule();
      } else if (response.method == "gpScheduleGet") {
        markSet(response.changes);

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
      while (memberElement.firstChild) {
        memberElement.removeChild(memberElement.firstChild);
      }
      console.log("メンバー配列:" + response.member)
      var member = response.member.substring(1, response.member.length - 1).split(",");
      if (member != "") {
        for (var user of member) {
          console.log("メンバー追加");
          addMemberLabel(user);
        }
      }
      loadSchedule();
    }
  }
}

function outsideClose(e) {
  if (e.target == addcModal) {
    addcModal.style.display = 'none';
  }
  if (e.target == addfModal) {
    addfModal.style.display = 'none';
  }
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// 前の月表示
function prev() {
  showDate.setMonth(showDate.getMonth() - 1);
  showProcess(showDate);
}

// 次の月表示
function next() {
  showDate.setMonth(showDate.getMonth() + 1);
  showProcess(showDate);
}

function theday(year, month, day) {
  console.log(year + "/" + month + "/" + day)
  var dateMsg = document.getElementById("date");
  dateMsg.innerText = year + "年" + month + "月" + day + "日の予定";
  modal.style.display = 'block';
  if (scheduleMap[year + "/" + month + "/" + day]) {
    var stuts = scheduleMap[year + "/" + month + "/" + day]
    const merged = Object.entries(stuts).reduce((acc, [key, value]) => {
      if (!acc[value] && value != "null") {
        acc[value] = [key];
      } else if (value != "null") {
        acc[value].push(key);
      }
      return acc;
    }, {});
    console.log(merged)
    var memberStuts = document.getElementById("member-stuts");
    memberStuts.innerHTML = "";
    if (merged["%E2%97%8B"]) {
      //memberStuts.innerHTML += "<div class = 'modal-body'><span style='color:green'>○</span>のひと</div>";
      memberStuts.innerHTML += "<div id='circleLabel' class = 'modal-body' style='text-align:left'>○のユーザー</div>"
      for (var user of merged["%E2%97%8B"]) {
        memberStuts.innerHTML += "<div class = 'modal-body' style='text-align:left'>" + user + " さん</div>";
      }
    }
    if (merged["%E2%96%B3"]) {
      //memberStuts.innerHTML += "<div class = 'modal-body'><span style='color:orange'>△</span>のひと</div>";
      memberStuts.innerHTML += "<div id='triangleLabel' class = 'modal-body' style='text-align:left'>△のユーザー</div>"
      for (var user of merged["%E2%96%B3"]) {
        memberStuts.innerHTML += "<div class = 'modal-body' style='text-align:left'>" + user + " さん</div>";
      }
    }
    if (merged["%C3%97"]) {
      //memberStuts.innerHTML += "<div class = 'modal-body'><span style='color:red'>×</span>のひと</div>";
      memberStuts.innerHTML += "<div id='crossLabel' class = 'modal-body' style='text-align:left'>×のユーザー</div>"
      for (var user of merged["%C3%97"]) {
        memberStuts.innerHTML += "<div class = 'modal-body' style='text-align:left'>" + user + " さん</div>";
      }
    }
  } else {
    var memberStuts = document.getElementById("member-stuts");
    memberStuts.innerHTML = "ここに表示する予定がありません。<br>マイページにて自分の予定を設定しましょう。";
  }
}

function close() {
  modal.style.display = 'none';
}

function getMark(mark) {
  if (mark == "△") {
    return "triangle";
  } else if (mark == "×") {
    return "cross";
  } else {
    return "circle";
  }
}

function getDecode(code) {
  if (code == "%E2%97%8B") {
    return "○";
  } else if (code == "%E2%96%B3") {
    return "△";
  } else if (code == "%C3%97") {
    return "×";
  } else {
    return null;
  }
}

function markSet(schedule) {
  scheduleMap = schedule;
  changes={}
  //schedule={"2022/12/10":{a:****,b:****},....}
  for (var oneDay of Object.keys(schedule)) {
    var counts = new Map();
    //oneDay = {a:****,b:****}
    for (var mark of Object.values(schedule[oneDay])) {
      console.log(oneDay + ":" + mark)
      if (counts[mark]) {
        counts.set(mark, counts[mark] + 1);
      } else if (mark != "null") {
        counts.set(mark, 1);
      }
    }
    console.log(counts)
    //counts = {*****:1,*****:3} key = code ,value = counts of key
    const maxKey = [...counts.entries()].reduce((a, b) => (b[1] > a[1] ? b : a))[0];
    var sameCounts = [];

    for (var mark of counts.keys()) {
      if (counts[mark] == counts[maxKey]) {
        sameCounts.push(mark);
      }
    }
    if (sameCounts.includes("%C3%97")) {
      console.log(oneDay+":"+getDecode("%C3%97"));
      changes[oneDay] = getDecode("%C3%97");
    } else if (sameCounts.includes("%E2%96%B3")) {
      console.log(oneDay+":"+getDecode("%E2%96%B3"));
      changes[oneDay] = getDecode("%E2%96%B3");
    } else if (sameCounts.includes("%E2%97%8B")) {
      console.log(oneDay+":"+getDecode("%E2%97%8B"));
      changes[oneDay] = getDecode("%E2%97%8B");
    }else{
      console.log("else : "+sameCounts);
    }
  }



  console.log(changes);
  showProcess(today, calendar);
}


// カレンダー表示
function showProcess(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月 " + groupName;

  var calendar = createProcess(year, month);
  document.querySelector('#calendar').innerHTML = calendar;
}

// カレンダー作成
function createProcess(year, month) {
  // 曜日
  var calendar = "<table><tr class='dayOfWeek'>";
  for (var i = 0; i < week.length; i++) {
    calendar += "<th>" + week[i] + "</th>";
  }
  calendar += "</tr>";

  var count = 0;
  var startDayOfWeek = new Date(year, month, 1).getDay();
  var endDate = new Date(year, month + 1, 0).getDate();
  var lastMonthEndDate = new Date(year, month, 0).getDate();
  var row = Math.ceil((startDayOfWeek + endDate) / week.length);

  // 1行ずつ設定
  for (var i = 0; i < row; i++) {
    calendar += "<tr>";
    // 1colum単位で設定
    for (var j = 0; j < week.length; j++) {
      if (i == 0 && j < startDayOfWeek) {
        // 1行目で1日まで先月の日付を設定
        calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
      } else if (count >= endDate) {
        // 最終行で最終日以降、翌月の日付を設定
        count++;
        calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
      } else {
        // 当月の日付を曜日に照らし合わせて設定
        count++;
        if (year == today.getFullYear() &&
          month == (today.getMonth()) &&
          count == today.getDate()) {
          calendar += "<td id = day" + count + " class='today'>" + count +
            "<br><input TYPE='button' onclick='theday(" + year + "," + (month + 1) + "," + count + ")' class=" +
            (changes[year + "/" + (month + 1) + "/" + count] ? getMark(changes[year + "/" + (month + 1) + "/" + count]) : "circle") +
            " VALUE=" + (changes[+year + "/" + (month + 1) + "/" + count] ? changes[year + "/" + (month + 1) + "/" + count] : "○") + "></td>";
        } else {
          calendar += "<td id = day" + count + ">" + count +
            "<br><input TYPE='button' onclick='theday(" + year + "," + (month + 1) + "," + count + ")' class=" +
            (changes[year + "/" + (month + 1) + "/" + count] ? getMark(changes[year + "/" + (month + 1) + "/" + count]) : "circle") +
            "  VALUE=" + (changes[year + "/" + (month + 1) + "/" + count] ? changes[year + "/" + (month + 1) + "/" + count] : "○") + "></td>";
        }
      }
    }
    calendar += "</tr>";
  }

  return calendar;
}


window.addEventListener("load", function() {
  showProcess(today, calendar);
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
  myscheduleElement.setAttribute('href', "mypage.html?user=" + params.get("user"));
  hideElements();
  loadGroup();
}, false);

window.addEventListener('click', outsideClose);
