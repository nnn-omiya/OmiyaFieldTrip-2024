"use strict";

const replaceText = '\uFF0A';// *

const form = document.getElementById('login-form')
const passwordInput = document.getElementById('password');

const password = []

let passwordLength = 0;

passwordInput.addEventListener('input', (event) => {
	const arrayInput = Array.from(event.target.value);
	const index = arrayInput.findIndex(char => char !== replaceText);
	const focused = event.target.selectionStart;
	if (event.target.value.length != 0) {
		password.splice(focused, passwordLength - event.target.value.length);
		if (index != -1) {
			password.splice(focused - 1, 1);
			password.splice(index, 0, event.target.value.charAt(index));
		}
	} else {
		password.length = 0;
	}
	passwordLength = event.target.value.length;
	event.target.value = replaceText.repeat(event.target.value.length);
});

window.addEventListener('load', () => {
	form.elements['name'].value = '';
	form.elements['password'].value = '';
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const name = event.target.elements['name'];
	processLogin(name.value);
	name.value = '';
	event.target.elements['password'].value = '';
	password.length = 0;
});

function processLogin(teamName) {
	fetch('http://localhost:3000/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			teamName: teamName,
			password: getPassword(),
		}),
	})
	.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			localStorage.setItem('teamName', teamName);
	})
	.catch(e => {
			onTrigger();
			console.error(e);
	});
}

function getPassword() {
	return password.join('');
}

function onTrigger() {
	console.log('onTrigger');
	const element = document.querySelector('samp#error');
	element.classList.add('fadeOut');

	element.addEventListener('animationend', function() {
		element.classList.remove('fadeOut');
	}, { once: true });
}

window.addEventListener('load', () => {
	const teamName = localStorage.getItem('teamName');
	if (teamName) {
		Array.from(document.querySelectorAll('span#team-name')).forEach(element => {
			element.textContent = teamName;
		});
		document.querySelector('samp#already').style.opacity = 1;
		localStorage.removeItem('teamName');
	} else {
		console.log('failed to get teamName');
	}
})
