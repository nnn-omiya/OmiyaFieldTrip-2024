var urlParams = new URLSearchParams(window.location.search);
var monsterName = urlParams.get('monsterName');
var imagePath = urlParams.get('path');
var xp = urlParams.get('xp');

document.querySelector("#monsterImage").src = `public/images/${imagePath}_result.png`
document.querySelector("#resultText").innerHTML = `${monsterName}を倒した！<br><br>経験値を${xp}獲得した`;