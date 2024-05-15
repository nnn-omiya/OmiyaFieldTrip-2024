//共通変数
let currentTeamId = -1;
let currentTeamName = "無し";

//GASのAPI
const deployID = "AKfycbwIvn7aMGtOEvd84KFralVQStQm7HHCuSlUarDd8gD5QGHdCWi-oY2KmZYigW27fBgmEw"
const base_url =  "https://script.google.com/a/macros/nnn.ed.jp/s/"+ deployID + "/exec";

//ページ読み込まれたときに処理
document.addEventListener("DOMContentLoaded", function() {
	const localdata = localStorage.getItem('teamName');
    if (JSON.parse(localdata)) {
		currentTeamId = JSON.parse(localdata).id;
        currentTeamName = JSON.parse(localdata).name;
	} else if (!["/index.html","/login.html", "/about.html"].find(page => page == location.pathname)) {
		console.log('teamNameは存在しません');
        location.replace("index.html");
	}
});

function getTeamName() {
    return currentTeamName
}
