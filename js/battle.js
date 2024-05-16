var globalresponse;
var urlParams = new URLSearchParams(window.location.search);
var checkpoint = urlParams.get('id');

let intervalId = null;

function toggleLoading(target) {
  const targetItem = document.querySelector(target);
	const loading = document.getElementById('loading');

	const loadingText = document.querySelector('#loading span');
	let dots = '';
	const addDot = () => {
		dots = dots.length < 3 ? dots + '.' : '';
		loadingText.textContent = dots;
	}

	if (loading.style.display === 'none') {
		targetItem.style.display = 'none';
		loading.style.display = 'block';
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
  toggleLoading(".responsive > div:nth-child(2)")
  fetch(`${base_url}?path=getQuestions&checkpoint=${checkpoint}`)
    .then((response) => {
      response.json().then(response => {
        document.querySelector("#monsterImage").src = `public/images/${response.path}.png`
        document.querySelector("#monsterAbout").innerHTML = `${response.monsterName}があらわれた！<br><br>${response.question}`;
        console.log(response.question)
        globalresponse = response;
        toggleLoading(".responsive > div:nth-child(2)")
      });
    });
  const teamName = localStorage.getItem('teamName');
	if (JSON.parse(teamName)) {
		Array.from(document.querySelectorAll('#teamName')).forEach(element => {
			element.textContent = `${getTeamName()}`;
		});
	} else {
		console.log('failed to get teamName');
	}
});

document.getElementById("checkButton").addEventListener("click", function() {
	toggleLoading(".responsive > div:nth-child(2)")
	var inputText = document.getElementById("textInput").value;

	console.log('checkpoint:', checkpoint);
	const keyword = inputText;
	const url = base_url+`?path=keyword&checkpoint=${checkpoint}&keyword=${keyword}&teamId=${currentTeamId}`
	console.log(url);
	fetch(url).then(item => item.json().then(data => {
			console.log(data)
			if (data.status === 1) {
				window.location.href = "result.html?"+new URLSearchParams(globalresponse);
			} else {
				toggleLoading(".responsive > div:nth-child(2)")
				document.querySelector("#monsterAbout").innerHTML = `あいことばが違います！<br><br>${globalresponse.question}`;
			}
	}))
});
