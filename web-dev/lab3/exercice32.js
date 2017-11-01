"use strict";


var dataGlob;

function loadJSON(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            var data = JSON.parse(rawFile.responseText);
            dataGlob = data;
            callback(data);
        }
    };
    rawFile.send(null);
}




function print() {

    var iframe = document.createElement('iframe');
    iframe.frameBorder = 0;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.id = "frame";

    document.getElementById("MAIN").appendChild(iframe);
    var mainSlide = document.getElementById("frame");


    //Create slide array
    var slideArray = dataGlob['slides'];

    //Set up array index
    var slideIndex = 0;
    // here the flag
    var stop = false;

    //Create function to cycle through slides
    function changeSlide() {

        mainSlide.setAttribute("src", slideArray[slideIndex]['url']);
        slideIndex++;
        if (slideIndex >= slideArray.length) {
            slideIndex = 0;
        }
    }

    //Call cycle function
    changeSlide(slideArray[slideIndex]["url"]);

    var intervalHandle = setInterval(changeSlide, slideArray[slideIndex]['time'] * 1000);

    var stopButton = document.getElementById("stop");

    stopButton.onclick = function() {
        console.log(stop);
        if (!stop) {
            clearInterval(intervalHandle);
            stop = true;
        } else {
            intervalHandle = setInterval(changeSlide, slideArray[slideIndex]['time'] * 1000);
            stop = false;
        }
    };


    var predButton = document.getElementById("pred");

    predButton.onclick = function() {

        clearInterval(intervalHandle);
        stop = true;
        var target;
        if (slideIndex === 1) {
            target = dataGlob['slides'].length - 1;
            slideIndex = dataGlob['slides'].length;

        } else {
            target = slideIndex - 2;
            slideIndex = slideIndex - 1;

        }

        mainSlide.setAttribute("src", slideArray[target]['url']);

    };

    var succButton = document.getElementById("succ");

    succButton.onclick = function() {

        clearInterval(intervalHandle);
        stop = true;
        var target = slideIndex;
        if (slideIndex === dataGlob['slides'].length) {
            target = 0;

        }

        mainSlide.setAttribute("src", slideArray[target]['url']);
        slideIndex = slideIndex + 1;

        if (slideIndex >= slideArray.length) {
            slideIndex = 0;
        }

    };

}


(function() {

    loadJSON("./slides.json", function(data) {});

})();