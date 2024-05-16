function main() {
  fetch(`${base_url}?path=user_status&teamId=${currentTeamId}`)
  .then((response) => {
    response.json().then(response => {
      console.log(response);
      toggleLoading("display")
      output_status_data(response);
    });
  });

  function output_status_data(status) {
    document.getElementsByClassName("name")[0].children[0].innerText = status.teamName
    document.getElementsByClassName("miteiyouso")[0].children[0].innerText = `レベル:${status.level}`
    document.getElementsByClassName("miteiyouso")[0].children[1].innerText = `最高順位:${status.maxRank}`
    document.getElementsByClassName("checkpoint")[0].children[0].innerText = `チェックポイント:${countSetBits(status.checkpoint)}個`
    document.getElementsByClassName("checkpoint")[0].children[1].innerText = `倒したメンター数:${countSetBits(status.mentor)}個`
    function countSetBits(num) {
      let count = 0;
      while (num) {
        count += num & 1;
        num >>= 1;
      }
      return count;
    }
    getRootItems(status.mentor - 1)
  }
}

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
		targetItem.style.display = 'block';
		loading.style.display = 'none';
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}
}

window.addEventListener('load', () => {
  toggleLoading("display")
  main()
  const teamName = localStorage.getItem('teamName');
	if (JSON.parse(teamName)) {
		Array.from(document.querySelectorAll('.teamname')).forEach(element => {
			element.textContent = `チーム名:${getTeamName()}`;
		});
	} else {
		console.log('failed to get teamName');
	}
});

function getRootItems(bit) {
  const itemList = ['お花','カメラ','クラブ（ジャグリングのやつ）','のど飴','マイク','アイドルアクスタ','ダンベル']
  const bitString = bit.toString(2).split('').reverse();
  const rootItem = itemList.filter((_, index) => bitString[index] === '1');
  document.querySelector('.root-item > div').innerHTML = rootItem.join(',')
}
