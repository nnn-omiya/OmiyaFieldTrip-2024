document.getElementById("checkButton").addEventListener("click", function() {
    var globalresponse;
    var inputText = document.getElementById("textInput").value;
    var urlParams = new URLSearchParams(window.location.search);
    var checkpoint = urlParams.get('id');
    fetch(`${base_url}?path=getQuestions&checkpoint=${checkpoint}`)
    .then((response) => {
      response.json().then(response => {
        document.getElementById("text").children[0].innerText = response.question;
        globalresponse = response;
      });
    });
    console.log('checkpoint:', checkpoint); 
    const keyword = inputText;
    const url = base_url+`?path=keyword&checkpoint=${checkpoint}&keyword=${keyword}&teamId={currentTeamId}`
    console.log(url);
    fetch(url).then(item => item.json().then(data => { 
        console.log(data)
        if (data.status === 1) {
            window.location.href = "battleAfter.html?"+globalresponse;
        } else {
            alert('キーワードちゃうで');
        }
    } ))
});