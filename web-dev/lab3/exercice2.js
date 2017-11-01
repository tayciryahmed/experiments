"use strict";

function sendText() {
    var ajaxRequest; // The variable that makes Ajax possible!
    ajaxRequest = new XMLHttpRequest();

    // Create a function that will receive data sent from the server

    var name = document.getElementById('chatText').value;

    var queryString = "?phrase=" + name;
    ajaxRequest.open("POST", "chat.php" + queryString, true);
    ajaxRequest.send(null);
    document.getElementById("chatText").value = "";
    alert("Message sent. To see it wait 10s for the page to automaticlly reload");
}



window.onload = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var data = this.responseText.split('<br />');

            var html = '';

            for (var i = data.length - 1; i > 0; i--) {
                html += '<p>' + data[i] + '</p>';
            }
            document.getElementById('result').innerHTML += html;


        }
    };
    xhttp.open("GET", "texte.html", true);
    xhttp.send();

}

setTimeout(function() {
    window.location.reload(1);
}, 10000);