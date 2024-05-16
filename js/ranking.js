function main() {
  fetch(`${base_url}?path=user_ranks&teamId=${currentTeamId}`)
  .then((response) => {
    response.json().then(response => {
      response.forEach((item, i) => {
        document.getElementsByClassName("party")[i].innerText = item[0];
        document.getElementsByClassName("level")[i].innerText = `経験値:${item[1]}`;
      })
      toggleLoading("runking")
    });
  });
}

let intervalId = null;

function toggleLoading(target) {
  const targetItem = document.getElementById(target);
	const loading = document.getElementById('loading');

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
		targetItem.style.display = null;
		loading.style.display = 'none';
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}
}

window.addEventListener('load', () => {
  toggleLoading("runking")
  main()
  const teamName = localStorage.getItem('teamName');
	if (JSON.parse(teamName)) {
		Array.from(document.querySelectorAll('.party2')).forEach(element => {
			element.textContent = `チーム名:${getTeamName()}`;
		});
	} else {
		console.log('failed to get teamName');
	}
});
