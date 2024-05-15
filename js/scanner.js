const video = document.getElementById('video');
const media = navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 480, height: 720, facingMode: "environment" } })
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
		document.querySelector('.error').style.display = 'block';
		document.querySelector('.loading').style.display = 'none';
	});

const cvs = document.getElementById('camera-canvas');
const ctx = cvs.getContext('2d');
const canvasUpdate = (width, Height) => {
	cvs.width = width;
	cvs.height = Height;
	const videoRatio = video.videoWidth / video.videoHeight;
	const canvasRatio = width / Height;
	const draw = (drawWidth, drawHeight) => {
		const startX = video.videoWidth / 2 - drawWidth / 2;
		const startY = video.videoHeight / 2 - drawHeight / 2;
		ctx.drawImage(video, startX, startY, drawWidth, drawHeight, 0, 0, width, Height);
	}

	if (videoRatio > canvasRatio) {
		draw(video.videoHeight * canvasRatio, video.videoHeight);
	} else {
		draw(video.videoWidth, video.videoWidth / canvasRatio);
	}
	requestAnimationFrame(() => canvasUpdate(width, Height));
}

// QRコードの検出
const rectCvs = document.getElementById('rect-canvas');
const rectCtx =  rectCvs.getContext('2d');
const checkImage = (width, Height) => {
	const imageData = ctx.getImageData(0, 0, width, Height);
	const code = jsQR(imageData.data, width, Height);
	function isCodeDataFormat(codeData) {
    const regex = /\?type=\d+&id=\d+/;
    return regex.test(codeData);
	}

	if (code && isCodeDataFormat(code.data)) {
		console.log("QRコードが見つかりました", code.data);
		// location.href = `battle.html${code.data}`
		const id = code.data.split('&id=')[1];
		setBattle(id);
	} else {
		console.log("QRコードが見つかりません…", code);
		rectCtx.clearRect(0, 0, width, Height);
		setTimeout(()=>{ checkImage(width, Height) }, 500);
	}
}

function setBattle(id) {
	const MENTOR_NAME = 'monster'
	toggleLoading()
	const url = `${base_url}?path=getMentorName&id=${id}`;
	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			response.json().then(data => {
				console.log(data);
				if (data.name) {
					console.log(data.name);
					document.querySelector('.text span').innerText = data.name;
					document.querySelector('#loading').style.display = 'none';
					document.querySelector('#battle').style.display = 'block';
					document.querySelector('#battle button').setAttribute('onclick', `attack(${id})`);
				} else {
					console.log('failed');
				}
			})
		})
		.catch(e => {
			console.error(e);
		});
}

let intervalId = null;

function toggleLoading() {
	const loading = document.getElementById('loading');

	const loadingText = document.querySelector('#loading span');
	let dots = '';
	const addDot = () => {
		dots = dots.length < 3 ? dots + '.' : '';
		loadingText.textContent = dots;
	}
	document.querySelector('#qr-reader').style.display = 'none';
	loading.style.display = 'flex';
	addDot();
	intervalId = setInterval(addDot, 500);
}

function attack(id) {
	const url = `${base_url}?path=killmentor&mentor_id=${id}&teamid=${currentTeamId}`;
	console.log(url);
	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			response.json().then(data => {
				console.log(data);
				if (data.status === 1) {
					console.log('success');
					// location.href = 'result.html';
				} else {
					console.log('failed');
				}
			})
		})
		.catch(e => {
			console.error(e);
		});
}
window.addEventListener('load', () => {
	const teamName = localStorage.getItem('teamName');
	if (JSON.parse(teamName)) {
		Array.from(document.querySelectorAll('span#team-name')).forEach(element => {
			element.textContent = getTeamName();
		});
	} else {
		console.log('failed to get teamName');
	}
});
