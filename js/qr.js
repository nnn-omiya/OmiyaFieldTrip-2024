const video = document.getElementById('video');
const media = navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 480, height: 720 } })
	.then((stream) => {
		video.srcObject = stream;
		video.onloadeddata = () => {
			video.play();
			const width = video.clientWidth;
			const height = video.clientHeight;
			canvasUpdate(width, height);
			checkImage(width, height);
		}
	}).catch((e) => {
		console.log(e);
	});

const cvs = document.getElementById('camera-canvas');
const ctx = cvs.getContext('2d');
const canvasUpdate = (contentWidth, contentHeight) => {
	cvs.width = contentWidth;
	cvs.height = contentHeight;

	// 映像のアスペクト比を計算
	const videoRatio = video.videoWidth / video.videoHeight;
	const canvasRatio = contentWidth / contentHeight;

	let drawWidth;
	let drawHeight;

	if (videoRatio > canvasRatio) {
		drawHeight = video.videoHeight;
		drawWidth = drawHeight * canvasRatio;
	} else {
		drawWidth = video.videoWidth;
		drawHeight = drawWidth / canvasRatio;
	}

	const startX = video.videoWidth / 2 - drawWidth / 2;
	const startY = video.videoHeight / 2 - drawHeight / 2;

	ctx.drawImage(video, startX, startY, drawWidth, drawHeight, 0, 0, contentWidth, contentHeight);
	requestAnimationFrame(() => canvasUpdate(contentWidth, contentHeight));
}

// QRコードの検出
const rectCvs = document.getElementById('rect-canvas');
const rectCtx =  rectCvs.getContext('2d');
const checkImage = (contentWidth, contentHeight) => {
	const imageData = ctx.getImageData(0, 0, contentWidth, contentHeight);
	const code = jsQR(imageData.data, contentWidth, contentHeight);

	if (code) {
		console.log("QRcodeが見つかりました", code.data);
		location.href = `battle.html${code.data}`
		drawRect(code.location, contentWidth, contentHeight);
	} else {
		console.log("QRcodeが見つかりません…", code);
		rectCtx.clearRect(0, 0, contentWidth, contentHeight);
	}
	setTimeout(()=>{ checkImage(contentWidth, contentHeight) }, 500);
}

// 四辺形の描画
const drawRect = (location, contentWidth, contentHeight) => {
	rectCvs.width = contentWidth;
	rectCvs.height = contentHeight;
	drawLine(location.topLeftCorner, location.topRightCorner);
	drawLine(location.topRightCorner, location.bottomRightCorner);
	drawLine(location.bottomRightCorner, location.bottomLeftCorner);
	drawLine(location.bottomLeftCorner, location.topLeftCorner)
}

// 線の描画
const drawLine = (begin, end) => {
	rectCtx.lineWidth = 4;
	rectCtx.strokeStyle = "#F00";
	rectCtx.beginPath();
	rectCtx.moveTo(begin.x, begin.y);
	rectCtx.lineTo(end.x, end.y);
	rectCtx.stroke();
}
