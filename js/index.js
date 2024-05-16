"use strict";

function navigate(url) {
	const teamName = localStorage.getItem('teamName');
	if (teamName || ["index.html","login.html"].find(page => page == url)) {
		window.location.href = url;
	} else {
		onTrigger();
	}
}

function onTrigger() {
	const element = document.querySelector('samp#error');
	element.classList.add('fadeOut');

	element.addEventListener('animationend', () => {
		element.classList.remove('fadeOut');
	}, { once: true });
}

window.addEventListener('load', () => {
	const teamName = localStorage.getItem('teamName');
	if (JSON.parse(teamName)) {
		document.querySelector('span#team-name').textContent = getTeamName();
		document.querySelector('button#login').classList.add('none');
		document.querySelector('button#game').classList.remove('none');
	} else {
		//console.log('failed to get teamName');
	}
});
