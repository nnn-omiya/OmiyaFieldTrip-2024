"use strict";

function navigate(url) {
	const teamName = localStorage.getItem('teamName');
	if (teamName || url === 'login.html') {
		window.location.href = url;
	} else {
		onTrigger();
	}
}

function onTrigger() {
	const element = document.querySelector('samp#error');
	element.classList.add('fadeOut');

	element.addEventListener('animationend', function() {
		element.classList.remove('fadeOut');
	}, { once: true });
}

window.addEventListener('load', () => {
	const teamName = localStorage.getItem('teamName');
	if (teamName) {
		document.querySelector('span#team-name').textContent = teamName;
	} else {
		console.log('failed to get teamName');
	}
})
