"use strict";
var express = require("express");
var path = require("path");
var qs = require('querystring');
var app = express();
var users = [];
// code for serving files 
app.use(express.static('./'));

app.set('view engine', 'ejs');

// section for strating the form page in the home page 

app.get('/', function(req, res) {

    res.render('exercice2d_query.ejs')

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

// code for ejs 

app.post('/api/users/:language/:id', function(req, res) {
    if (qs.unescape(req.body.id).indexOf('<b>') > -1) {
        res.render('exercice2d_response.ejs', {
            user: "Hello, please do not try to hack my website xD",
            language: " ",
            users: ""
        })
    } else if (qs.unescape(req.body.id).indexOf('<script>') > -1) {
        res.render('exercice2d_response.ejs', {
            user: "Hello, please do not try to hack my website xD",
            language: " ",
            users: ""
        })
    } else if (qs.unescape(req.body.id).indexOf('<') > -1) {
        res.render('exercice2d_response.ejs', {
            user: "Hello, please do not try to hack my website xD",
            language: " ",
            users: ""
        })

    } else {
        users.push({
            "id": req.body.id,
            "language": req.body.language,
            "time": new Date()
        });
        if (users.length > 1) {

            if (req.body.language === 'english') {
                res.render('exercice2d_response.ejs', {
                    user: "Hello " + req.body.id,
                    language: " ",
                    users: users
                })
            } else if (req.body.language === 'french') {
                res.render('exercice2d_response.ejs', {
                    user: "Bonjour " + req.body.id,
                    language: " ",
                    users: users
                })
            } else if (req.body.language === 'turkish') {
                res.render('exercice2d_response.ejs', {
                    user: "Marhaba " + req.body.id,
                    language: " ",
                    users: users
                })
            } else {
                res.render('exercice2d_response.ejs', {
                    user: req.body.id,
                    language: "The language you selected is not handled.",
                    users: users
                })
            }
        } else {
            if (req.body.language === 'english') {
                res.render('exercice2d_response.ejs', {
                    user: "Hello " + req.body.id,
                    language: "No one before you visited page ",
                    users: ""
                })
            } else if (req.body.language === 'french') {
                res.render('exercice2d_response.ejs', {
                    user: "Bonjour " + req.body.id,
                    language: "No one before you visited page ",
                    users: ""
                })
            } else if (req.body.language === 'turkish') {
                res.render('exercice2d_response.ejs', {
                    user: "Marhaba " + req.body.id,
                    language: "No one before you visited page ",
                    users: ""
                })
            } else {
                res.render('exercice2d_response.ejs', {
                    user: req.body.id,
                    language: "The language selected is not handled.",
                    users: "No one before you visited page"
                })
            }

        }

    }
});


//Creating Router() object

var router = express.Router();

app.use("/api", router);

app.use("*", function(req, res) {
    res.status(404).send('404');
});

// Listen to this Port

app.listen(3000, function() {
    console.log("Live at Port 3000");
});