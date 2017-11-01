"use strict";
var express = require("express");

var app = express();
// code for serving files 
app.use(express.static('./'));

// code for handling requests GET

//Creating Router() object

var router = express.Router();

router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
});

router.get("/", function(req, res) {
    res.send("Hello ");
});

router.get("/user/:id", function(req, res) {
    res.send("Hello " + req.params.id);
});

// Tell express to use this router with /api before.
// You can put just '/' if you don't want any sub path before routes.


app.use("/api", router);

app.use("*", function(req, res) {
    res.status(404).send('404');
});

// Listen to this Port

app.listen(3000, function() {
    console.log("Live at Port 3000");
});