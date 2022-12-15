const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);
var days = 0;
var changes = {};

var xmlHttpRequest;
// URLを取得
let url = new URL(window.location.href);

// URLSearchParamsオブジェクトを取得
let params = url.searchParams;

var greetingElement = document.getElementById("title");
greetingElement.innerText = params.get("user") + "さんのスケジュール";

function registerMySchedule() {

  const searchParams = new URLSearchParams(changes);
  var url = "doGet?method=registerMySchedule&user=" + params.get("user") + "&" + searchParams.toString();
  console.log(url)
  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receive;
  xmlHttpRequest.open("GET", url, true);
  xmlHttpRequest.send(null);

}

function getMySchedule() {
  var url = "doGet?method=getMySchedule&user=" + params.get("user");
  xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = receive;
  xmlHttpRequest.open("GET", url, true);
  xmlHttpRequest.send(null);

}

function receive() {
  if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
    var response = JSON.parse(xmlHttpRequest.responseText);
    var output = response.output;


    if (output == "success") {
      if (response.method == "init") {
        var dates = Object.keys(response);
        for (var date of dates) {
          if (getDecode(response[date]) != null) {
            var year = date.split("/")[0]
            var month = Number(date.split("/")[1])
            var day = Number(date.split("/")[2])
            changes["Date:" + year + "/" + month + "/" + day] = getDecode(response[date]);
          }
        }
        console.log("受けとったchange:")
        console.log(changes)
        showProcess(today, calendar);
        var tomypageElement = document.getElementById("tomypage");
        tomypageElement.setAttribute('href', "myPage.html?user=" + params.get("user"));
      }
    } else if (output == "decline") {

    }


  }
}

function getDecode(code) {
  if (code == "%E2%97%8B") {
    return "○";
  } else if (code == "%E2%96%B3") {
    return "△";
  } else if (code == "%C3%97") {
    return "×";
  } else if (code == "-") {
    return "-";
  } else {
    return null;
  }
}

function expCalendar() {
  var calendar = document.getElementById("calendar");
  calendar.style.visibility = "visible";
  var cheader = document.getElementById("header");
  cheader.style.visibility = "visible";
  var cButton = document.getElementById("next-prev-button");
  cButton.style.visibility = "visible";
}

window.addEventListener("load", function() {
  var expButtonElement = document.getElementById("exp_button");
  expButtonElement.addEventListener("click", registerMySchedule, false);
  getMySchedule();
  expCalendar();
}, false);

/*
// 初期表示
window.onload = function () {
    showProcess(today, calendar);
};
*/
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
  console.log(date);
  var dayElement = document.getElementById("day" + day);
  var date = "Date:" + year + "/" + month + "/" + day;

  if (dayElement.lastChild.value == "○") {
    dayElement.lastChild.value = "△";
    dayElement.lastChild.className = "triangle";

  } else if (dayElement.lastChild.value == "△") {
    dayElement.lastChild.value = "×";
    dayElement.lastChild.className = "cross";

  } else if (dayElement.lastChild.value == "×") {
    dayElement.lastChild.value = "-"
    dayElement.lastChild.className = "bar";

  } else if (dayElement.lastChild.value == "-") {
    dayElement.lastChild.value = "○";
    dayElement.lastChild.className = "circle";
  }
  changes[date] = dayElement.lastChild.value;
  console.log("現在のchange:")
  console.log(changes)
}

function getMark(mark) {
  if (mark == "△") {
    return "triangle";
  } else if (mark == "×") {
    return "cross";
  } else if (mark == "○") {
    return "circle";
  } else {
    return "bar";
  }
}

// カレンダー表示
function showProcess(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月";

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

  console.log("表示時のchange:")
  console.log(changes)
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
            (changes["Date:" + year + "/" + (month + 1) + "/" + count] ? getMark(changes["Date:" + year + "/" + (month + 1) + "/" + count]) : "bar") +
            " VALUE=" + (changes["Date:" + year + "/" + (month + 1) + "/" + count] ? changes["Date:" + year + "/" + (month + 1) + "/" + count] : "-") + "></td>";
        } else {
          calendar += "<td id = day" + count + ">" + count +
            "<br><input TYPE='button' onclick='theday(" + year + "," + (month + 1) + "," + count + ")' class=" +
            (changes["Date:" + year + "/" + (month + 1) + "/" + count] ? getMark(changes["Date:" + year + "/" + (month + 1) + "/" + count]) : "bar") +
            "  VALUE=" + (changes["Date:" + year + "/" + (month + 1) + "/" + count] ? changes["Date:" + year + "/" + (month + 1) + "/" + count] : "-") + "></td>";
        }
      }
    }
    calendar += "</tr>";
  }
  return calendar;
}
