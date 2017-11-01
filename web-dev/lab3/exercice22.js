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
    alert("Message sent. To see it wait 60s for the page to automaticlly reload (The value is chosen as big as that to give time to the user to type his message).");
}



window.onload = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText.split('<br />');

            var html = '';

            var usersColors = {};

            for (var i = data.length - 1; i >= data.length - 10; i--) {

                var cuurentUser = data[i].substring(data[i].indexOf("(") + 2, data[i].indexOf(")") - 1);

                if (!(cuurentUser in usersColors)) {

                    usersColors[cuurentUser] = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);

                }

                html += "<p style=color:" + usersColors[cuurentUser] + ">" + data[i] + "</p>";

            }

            document.getElementById('result').innerHTML += html;

        }
    };
    xhttp.open("GET", "texte.html", true);
    xhttp.send();

};

setTimeout(function() {
    window.location.reload(1);
}, 60000);