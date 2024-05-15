const slides = [
	{ image: 'image1.jpg', text: 'このサイトの使い方説明' },
	{ image: 'image2.jpg', text: '初期画面です\n初期設定のログインをする人は「始める」を\n使い方の説明は「使い方説明」を\nランキング表示は「ランキング」を押してください\n「ランキング」はログインしていないと開くことはできません' },
	{ image: 'image3.jpg', text: 'QRコードを読み取る画面です\nQRコードを読み取るとバトル画面に遷移します\nバトル画面はログインしていないと開くことはできません' },
	{ image: 'image4.jpg', text: 'バトル画面です\nバトル画面はログインしていないと開くことはできません\nバトル画面はQRコードを読み取ると開くことができます' },
];
let currentSlide = -1;

function switchSlide() {
	currentSlide = (currentSlide + 1) % slides.length;
	document.getElementById('slide-image').src = slides[currentSlide].image;
	document.getElementById('slide-text').innerText = slides[currentSlide].text;
}

document.getElementById('slideshow').addEventListener('click', switchSlide);

// 初期スライドの設定
switchSlide();
