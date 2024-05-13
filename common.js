//共通変数
var currentTeamId = -1;
var currentTeamName = "無し";

const deployID = "AKfycbzuSjKsvnbsm6ruHkETqEqJ69c8p6VLWxBVvgsw1ZJd-TyfEVyVNzbtpsez-qz4AkBNkg"
const base_url =  "https://script.google.com/a/macros/nnn.ed.jp/s/"+ deployID + "/exec";

//ページ読み込まれたときに処理
document.addEventListener("DOMContentLoaded", function() {
	const localdata = localStorage.getItem('teamName');
    if (JSON.parse(teamName)) {
		currentTeamId = JSON.parse(teamName).id;
        currentTeamName = JSON.parse(teamName).name;
	} else if (!["/index.html","/login.html", "/about.html"].find(page => page == location.pathname)) {
		console.log('teamNameは存在しません');
        location.replace("index.html");
	}
});

function getTeamName() {
    return currentTeamName
}