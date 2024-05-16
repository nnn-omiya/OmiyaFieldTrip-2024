//共通変数
let currentTeamId = -1;
let currentTeamName = "無し";

//GASのAPI
const deployID = "AKfycbwDly2n-GZgyVcnBz7cHA9ghtGzO3XOPAyH0ojfnrnelx_IUdqTRI1-xLyGxZi5cftSUg"
const base_url =  "https://script.google.com/a/macros/nnn.ed.jp/s/"+ deployID + "/exec";

//ページ読み込まれたときに処理

const localdata = localStorage.getItem('teamName');
	if (JSON.parse(localdata)) {
	currentTeamId = JSON.parse(localdata).id;
			currentTeamName = JSON.parse(localdata).name;
} else if (!["/index.html","/login.html", "/about.html"].find(page => page == location.pathname)) {
	console.log('teamNameは存在しません');
			location.replace("index.html");
}

if (document.cookie.indexOf("5=t") != -1) {
	Array.from(document.querySelectorAll('*')).filter((b_)=>{
		if (b_.textContent == '大宮の守り人') {b_.textContent = '大宮の花嫁';}
	});
}


function getTeamName() {
    return currentTeamName
}
console.log("おや、こんなところ見るなんてあなたプログラマー？\n徹夜で作ってるものだから穴があっても優しく使ってね\n私たちイノキャン大宮、プログラマー募集してます\n@ちきなにDMください")
