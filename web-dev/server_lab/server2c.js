"use strict";
var express = require("express");
var path = require("path");
var qs = require('querystring');
var app = express();
// code for serving files 
app.use(express.static('./'));
var router = express.Router();


// section for starting the form page in the home page 

app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname + '/exercice2c.html'));

});


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

// this is the code used in the app 
app.post('/api/users/', function(req, res) {
    if (req.body.language === 'french') {
        res.json({
            "message": "Bonjour " + req.body.id
        });
    } else if (req.body.language === 'english') {
        res.json({
            "message": "Hello " + req.body.id
        });
    } else if (req.body.language === 'turkish') {
        res.json({
            "message": "Marhaba " + req.body.id
        });
    } else {
        res.json({
            "message": req.body.id + ", sorry your language not handled"
        });
    }
});

/// Bonus : code if we want to use a GET request in the form 
app.get("/api/users/:id", function(req, res) {
    res.json({
        "message": "Hello " + req["params"]["id"]
    });
});

// Bonus : code for handling requests GET
router.get("/user/:language/:id", function(req, res) {
    if (req.params.language === 'english') {
        res.send("Hello " + req.params.id);
    } else if (req.params.language === 'french') {
        res.send("Bonjour " + req.params.id);
    } else if (req.params.language === 'turkish') {
        res.send("Marhaba " + req.params.id);
    } else {
        res.send("The language you selected is not handled.");
    }

});


app.use("/api", router);

app.use("*", function(req, res) {
    res.status(404).send('404');
});

// Listen to this Port

app.listen(3000, function() {
    console.log("Live at Port 3000");
});