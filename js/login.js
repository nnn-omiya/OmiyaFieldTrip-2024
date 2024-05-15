// const replaceText = '\uFF0A'; // *

const form = document.getElementById('login-form')
const passwordInput = document.getElementById('password');

// const password = []

// Androidとかのバグで、フォーカスが上手く取れないので泣く泣く諦める
// let passwordLength = 0;
// passwordInput.addEventListener('input', (event) => {
// 	document.querySelector('div#test').textContent = `${password}`;
// 	const arrayInput = Array.from(event.target.value);
// 	const index = arrayInput.findIndex(char => char !== replaceText);
// 	const focused = event.target.selectionStart;
// 	if (event.target.value.length != 0) {
// 		password.splice(focused, passwordLength - event.target.value.length);
// 		if (index != -1) {
// 			password.splice(focused - 1, 1);
// 			password.splice(index, 0, event.target.value.charAt(index));
// 		}
// 	} else {
// 		password.length = 0;
// 	}
// 	passwordLength = event.target.value.length;
// 	event.target.value = replaceText.repeat(event.target.value.length);
// });

window.addEventListener('load', () => {
	form.elements['name'].value = '';
	form.elements['password'].value = '';
});

form.addEventListener('submit', (event) => {
	toggleLoading()
	event.preventDefault();
	const name = event.target.elements['name'];
	const password = event.target.elements['password'];
	processLogin(name.value, password.value);
	name.value = '';
	password.value = '';
	password.length = 0;
});
function processLogin(teamName, password) {
	console.log(teamName, password);
	fetch(base_url, {
		'method': 'POST',
		'body': JSON.stringify({
			path: 'user_login',
			data: {
				teamName: teamName,
				password: password
			}
		}),
		"Content-Type": "text/plain",
		"muteHttpExceptions" : true,
    "validateHttpsCertificates" : false,
		"followRedirects": false,
		redirect: 'follow',
	}).then(response => {
		if (!response.ok) {
			toggleLoading()
			throw new Error('Network response was not ok');
		}
		response.json().then(data => {
			console.log(data);
			if (data.status === 1) {
				localStorage.setItem('teamName', `{"name":"${teamName}","id":"${data.id}"}`);
				navigate('game.html');
			} else {
				onTrigger();
				toggleLoading()
			}
		})
	})
		.catch(e => {
			toggleLoading()
			onTrigger();
			console.error(e);
	});
}

let intervalId = null;

function toggleLoading() {
  const form = document.getElementById('login-form');
	const loading = document.getElementById('loading');

	const loadingText = document.querySelector('#loading span');
	let dots = '';
	const addDot = () => {
		dots = dots.length < 3 ? dots + '.' : '';
		loadingText.textContent = dots;
	}

	if (loading.style.display === 'none') {
		form.style.display = 'none';
		loading.style.display = 'flex';
		addDot();
		intervalId = setInterval(addDot, 500);
	} else {
		form.style.display = 'block';
		loading.style.display = 'none';
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}
}

function navigate(url) {
	const teamName = localStorage.getItem('teamName');
	if (teamName || ["index.html","login.html", "about.html"].find(page => page == url)) {
		window.location.href = url;
	} else {
		onTrigger();
	}
}

function getPassword() {
	return password.join('');
}

function onTrigger() {
	console.log('onTrigger');
	const element = document.querySelector('samp#error');
	element.classList.add('fadeOut');

	element.addEventListener('animationend', () => {
		element.classList.remove('fadeOut');
	}, { once: true });
}

window.addEventListener('load', () => {
	const teamName = localStorage.getItem('teamName');
	if (JSON.parse(teamName)) {
		localStorage.removeItem('teamName');
		Array.from(document.querySelectorAll('span#team-name')).forEach(element => {
			element.textContent = getTeamName();
		});
		document.querySelector('samp#already').style.opacity = 1;
	} else {
		console.log('failed to get teamName');
	}
});
