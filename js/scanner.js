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
		const id = code.data.split('&id=')[1];
		setBattle(id);
		video.srcObject.getVideoTracks().forEach(track => track.stop());
	} else {
		console.log("QRコードが見つかりません…", code);
		rectCtx.clearRect(0, 0, width, Height);
		setTimeout(()=>{ checkImage(width, Height) }, 500);
	}
}

function setBattle(id) {
	toggleLoading('qr-reader')
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
					toggleLoading('battle');
					document.querySelector('#battle button').setAttribute('onclick', `attack(${id}, "${data.name}")`);
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

function toggleLoading(target) {
	const loading = document.getElementById('loading');
	const targetItem = document.getElementById(target);

	const loadingText = document.querySelector('#loading span');
	let dots = '';
	const addDot = () => {
		dots = dots.length < 3 ? dots + '.' : '';
		loadingText.textContent = dots;
	}
	if (loading.style.display === 'none') {
		targetItem.style.display = 'none';
		loading.style.display = 'flex';
		addDot();
		intervalId = setInterval(addDot, 500);
	} else {
		loading.style.display = 'none';
		targetItem.style.display = 'block';
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}
}

function attack(id, name) {
	toggleLoading('battle');
	const url = `${base_url}?path=killmentor&mentor_id=${id}&teamId=${currentTeamId}`;
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
					location.href = `result.html?monsterName=${name}&xp=${data.xp}&path=silver&drop=${data.drop}`;
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
