"use strict";

function loadJSON(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            var data = JSON.parse(rawFile.responseText);
            callback(data);
        }
    }
    rawFile.send(null);
}



(function() {

    loadJSON("./slides.json", function(data) {

        for (var i = 0; i < data["slides"].length; i++) {

            (function() {


                var j = i;

                var n = 1000 * data["slides"][j]["time"];
                setTimeout(function() {

                    document.getElementById("MAIN").innerHTML = "";
                    document.getElementById("MAIN").innerHTML = '<iframe width="100%" height="100%" frameborder="5" src=' + data["slides"][j]["url"] + ' ></iframe>';


                }, n);


            })();


        }

        setInterval(function() {

            console.log(1000 * data["slides"][data["slides"].length - 1]["time"] + 15000);

            for (var i = 0; i < data["slides"].length; i++) {

                (function() {

                    var j = i;
                    var n = 1000 * data["slides"][j]["time"];
                    setTimeout(function() {

                        document.getElementById("MAIN").innerHTML = "";
                        document.getElementById("MAIN").innerHTML = '<iframe width="100%" height="100%" frameborder="5" src=' + data["slides"][j]["url"] + ' ></iframe>';


                    }, n);

                })();


            }

        }, 1000 * data["slides"][data["slides"].length - 1]["time"] + 15000);


    });

})();