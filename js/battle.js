var globalresponse;
var urlParams = new URLSearchParams(window.location.search);
var checkpoint = urlParams.get('id');

fetch(`${base_url}?path=getQuestions&checkpoint=${checkpoint}`)
.then((response) => {
  response.json().then(response => {
    document.querySelector("#monsterImage").src = `public/images/${response.path}.png`
    document.querySelector("#monsterAbout").innerHTML = `${response.monsterName}があらわれた！<br><br>${response.question}`;
    console.log(response.question)
    globalresponse = response;
  });
});

document.getElementById("checkButton").addEventListener("click", function() {
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
            alert('キーワードちゃうで');
        }
    } ))
});