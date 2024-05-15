function main() {
  fetch(`${base_url}?path=user_ranks&teamId=${currentTeamId}`)
  .then((response) => {
    response.json().then(response => {
      //console.log(response);
      output_status_data(response);
    });
  });

  function output_status_data(status) {
    for(let i=0; i<6; i++) {
      document.getElementsByClassName("party")[i].innerText = status[i][0];
      document.getElementsByClassName("level")[i].innerText = `Lv.${status[i][1]}`;
    }
    document.getElementsByClassName("name")[0].children[0].innerText = status.teamName
    document.getElementsByClassName("miteiyouso")[0].children[0].innerText = `レベル:${status.level}`
    document.getElementsByClassName("miteiyouso")[0].children[1].innerText = `最高順位:${status.maxRank}`
    document.getElementsByClassName("checkpoint")[0].children[0].innerText = `チェックポイント:${countSetBits(status.checkpoint)}個`
    document.getElementsByClassName("checkpoint")[0].children[1].innerText = `チェックポイント:${countSetBits(status.mentor)}個`
    function countSetBits(num) {
      let count = 0;
      while (num) {
        count += num & 1;
        num >>= 1;
      }
      return count;
    }
  }
}

if (document.readyState !== "loading") {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main, false);
}