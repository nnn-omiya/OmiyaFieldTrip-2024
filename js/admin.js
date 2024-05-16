function search() {
  fetch(`${base_url}?path=user_status&teamId=${document.querySelector("#teamId").value}`)
  .then((response) => {
    response.json().then(response => {
      output_status_data(response);
    });
  });

  function output_status_data(status) {
    document.getElementsByClassName("name")[0].children[0].innerText = status.teamName
    document.getElementsByClassName("miteiyouso")[0].children[0].innerText = `経験値:${status.level}`
    document.getElementsByClassName("miteiyouso")[0].children[1].innerText = `最高順位:${status.maxRank}`
    getRootItems(status.mentor)
    getRootItems2(status.checkpoint)
  }
}

window.addEventListener('load', () => {
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
  const itemList = ['mentor_kobayashi','mentor_tateno','mentor_sakano','mentor_tokunaga','ta_kato','ta_tsukamoto','ta_hashimoto']
  const bitString = bit.toString(2).split('').reverse();
  const rootItem = itemList.filter((_, index) => bitString[index] === '1');
  document.querySelector('.root-item > div').innerHTML = rootItem.join(',')
}

function getRootItems2(bit) {
  const itemList = ['cp_hall','cp_coffee','cp_bread','park_omikuji','park_kapi','park_pig','park_garden','park_museum','sonic_symbol','animate_animate','tutorial_cp']
  const bitString = bit.toString(2).split('').reverse();
  const rootItem = itemList.filter((_, index) => bitString[index] === '1');
  document.querySelector('.checkpoint > div').innerHTML = rootItem.join(',')
}