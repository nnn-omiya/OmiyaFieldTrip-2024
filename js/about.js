const slides = [
	{ image: 'index_first.jpg', text: '初期画面です\n初期設定のログインをする人は「始める」を\n使い方の説明は「使い方説明」を\nランキング表示は「ランキング」を押してください\n「ランキング」はログインしていないと開くことはできません' },
	{ image: 'login.jpg', text: 'ログイン画面です\nフォームで提出したチーム名とパスワードを入力してもらいます\nパスワードはアルファベットです。\n間違えて日本語で入力してしまうとログインできません' },
	{ image: 'index_login.jpg', text: 'ログインすると表示される画面です\nこの画面であれば「続きから」と「ランキング」を開くことができます'},
	{ image: 'game.jpg', text: 'ゲーム画面です\n「続きから」を選択すると表示されます\n「QRを読み取る」を押すとQRコードを読み取る画面に遷移します\nマップの旗はチェックポイントなのでそこを押すとチェックポイントの情報が表示されます\n「ステータス」を押すとステータス画面が表示されます'},
	{ image: 'scanner.jpg', text: 'QRコードを読み取る画面です\nQRコードを読み取るとバトル画面に遷移します\nバトル画面はログインしていないと開くことはできません'},
	{ image: 'scanner_mentor.jpg', text: 'バトル画面です\nバトル画面はログインしていないと開くことはできません\nバトル画面はQRコードを読み取ると開くことができます'},
	{ image: 'result_scanner.jpg', text: '「攻撃をする」をクリックするとバトル結果画面に遷移します\n一応何回も倒しても、経験値が入るように見えますが、一回のみです'},
	{ image: 'checkpoint.jpg', text: 'マップの旗をクリックするとチェックポイントの情報が表示されます\nチェックポイントの情報はログインしていないと開くことはできません'},
	{ image: 'result_checkpoint.jpg', text: '合言葉を表示すると、この画面に移動します\n一応何回も倒しても、経験値が入るように見えますが、一回のみです' },
	{ image: 'status.jpg', text: 'ステータス画面です\nステータス画面はログインしていないと開くことはできません\n「ステータス」はログインしていないと開くことはできません' },
	{ image: 'ranking.jpg', text: 'ランキング画面です\n上位五チームと自分の経験値がわかります\n「ランキング」はログインしていないと開くことはできません' },
];
let currentSlide = -1;

function switchSlide() {
	currentSlide = (currentSlide + 1) % slides.length;
	document.getElementById('slide-image').src = `/public/images/about/${slides[currentSlide].image}`;
	document.getElementById('slide-text').innerText = slides[currentSlide].text;
}

document.getElementById('slideshow').addEventListener('click', switchSlide);

// 初期スライドの設定
switchSlide();

window.addEventListener('load', () => {
	const teamName = localStorage.getItem('teamName');
	if (JSON.parse(teamName)) {
		Array.from(document.querySelectorAll('span#team-name')).forEach(element => {
			element.textContent = getTeamName();
		});
	} else {
		//console.log('failed to get teamName');
	}
});
