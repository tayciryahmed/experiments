"use strict";
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tp1'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }



    console.log('connected as id ' + connection.threadId);
});



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

    res.render('exercice3a.ejs', {
        message: " ",
        users: ""
    })

});

// Code for handeling POST 
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

// code for viewing base content 
app.get('/api/db/view', function(req, res) {

    res.render('exercice3a_view.ejs', {
        message: " ",
        users: ""
    })

});
app.post('/api/db/view/titles', function(req, res) {
    connection.query('SELECT * FROM news', function(error, results, fields) {

        res.render('exercice3a_view.ejs', {
            message: "found these articles : ",
            users: results
        })

    });


});


// code for inserting base content 
app.get('/api/db/insert', function(req, res) {

    res.render('exercice3a_insert.ejs', {
        message: " "
    })

});
app.post('/api/db/insert/:titre/:auteur/:langue/:contenu', function(req, res) {
    var post = {
        titre: req.body.titre,
        date: new Date(),
        auteur: req.body.auteur,
        langue: req.body.langue,
        contenu: req.body.contenu
    };
    connection.query('INSERT INTO news SET ?', post, function(err, result) {
        res.render('exercice3a_insert.ejs', {
            message: "success"
        });
    });
});

// code for deleting base content 
app.get('/api/db/delete', function(req, res) {

    res.render('exercice3a_delete.ejs', {
        message: " "
    })

});

app.post('/api/db/delete/:titre', function(req, res) {
    var sql = "DELETE from news WHERE titre = ?";

    var query = connection.query(sql, req.body.titre, function(err, result) {

        res.render('exercice3a_delete.ejs', {
            message: "success." + 'deleted ' + result.affectedRows + ' row(s)'
        });
    });


});
// updating base content 
app.get('/api/db/update', function(req, res) {

    res.render('exercice3a_update.ejs', {
        message: " "
    })

});
app.post('/api/db/update/:titre/:contenu', function(req, res) {

    connection.query('UPDATE news SET ? WHERE ?', [{
        contenu: req.body.contenu
    }, {
        titre: req.body.titre
    }])

    res.render('exercice3a_update.ejs', {
        message: "success."
    });
});



// code for handling requests GET

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