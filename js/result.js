var urlParams = new URLSearchParams(window.location.search);
var monsterName = urlParams.get('monsterName');
var imagePath = urlParams.get('path');
var xp = urlParams.get('xp');

document.querySelector("#monsterImage").src = `public/images/${imagePath}_result.png`
document.querySelector("#resultText").innerHTML = `${monsterName}を倒した！<br><br>経験値を${xp}獲得した`;

const url = new URL(window.location.href);
history.replaceState(null, '', url.pathname);

window.addEventListener('load', () => {
	const teamName = localStorage.getItem('teamName');
	if (JSON.parse(teamName)) {
		Array.from(document.querySelectorAll('#teamName')).forEach(element => {
			element.textContent = `${getTeamName()}`;
		});
	} else {
		console.log('failed to get teamName');
	}
});
