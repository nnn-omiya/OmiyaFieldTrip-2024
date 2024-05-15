function navigate(url) {
	const teamName = localStorage.getItem('teamName');
	if (teamName || ["index.html","login.html", "about.html"].find(page => page == url)) {
		window.location.href = url;
	} else {
		onTrigger();
	}
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
