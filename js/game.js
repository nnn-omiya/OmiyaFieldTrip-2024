function navigate(url) {
	const teamName = localStorage.getItem('teamName');
	if (teamName || url === 'login.html') {
		window.location.href = url;
	} else {
		onTrigger();
	}
}

window.addEventListener('load', () => {
	const teamName = localStorage.getItem('teamName');
	if (JSON.parse(teamName)) {
		const name = JSON.parse(teamName).name;
		Array.from(document.querySelectorAll('span#team-name')).forEach(element => {
			element.textContent = name;
		});
	} else {
		console.log('failed to get teamName');
	}
});
