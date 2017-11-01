"use strict";


function loadDoc2() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var data = this.responseText.split(/[\n\r]+/);

            var arr1 = data;
            var target = document.getElementById('result');

            var colors = ['red', 'blue', 'green', 'grey', 'pink'];

            for (var i = 0; i < arr1.length; i++) {
                var elem = document.createElement('p'),
                    text = document.createTextNode(arr1[i]);
                elem.appendChild(text);

                elem.style.color = colors[i];

                target.appendChild(elem);


            }

        }
    };

    xhttp.open("GET", "text.txt", true);
    xhttp.send();

}

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("textToAdd").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "text.txt", true);
    xhttp.send();
}