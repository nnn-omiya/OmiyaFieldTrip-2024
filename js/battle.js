var keyword = "abc12345";

document.getElementById("checkButton").addEventListener("click", function() {
    var inputText = document.getElementById("textInput").value;
    if (inputText === keyword) {
        window.location.href = "battleAfter.html"; 
    } else {
        alert("キーワードが間違っています"); 
    }
});