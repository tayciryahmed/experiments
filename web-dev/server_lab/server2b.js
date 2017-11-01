"use strict";
var express = require("express");

var app = express();
// code for serving files 
app.use(express.static('./'));

// code for handling requests GET

//Creating Router() object

var router = express.Router();



router.get("/", function(req, res) {
    res.send("Hello ");
});

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

/// ############### Solution 2 - using Jade - template generating ############## ///
// var express = require("express");

// var app = express();
// // code for serving files 
// app.use(express.static('./'));

// // code for handling requests GET

// //Creating Router() object

// var router = express.Router();



// router.get("/",function(req,res){
//   res.json({"message" : "Hello "});
// });

// app.set('views', './views');
// app.set('view engine', 'jade');
// app.get('/', function (req, res) {
//   res.render('index', { message: 'Hello there!'});
// });

// router.get("/user/:language/:id",function(req,res){
//   if (req.params.language === 'english'){ res.render('index', {message: "Hello "+req.params.id});}
//   else if (req.params.language === 'french'){ res.render('index', {message: "Bonjour "+req.params.id});}
//   else if (req.params.language === 'turkish'){ res.render('index', {message: "Marhaba "+req.params.id});}
//   else  {res.render('index', {"message" : "The language you selected is not handled."});}

// });

// app.use("/api",router);

// app.use("*",function(req,res){
//   res.status(404).send('404');
// });

// // Listen to this Port

// app.listen(3000,function(){
//   console.log("Live at Port 3000");
// });

///// ######################################################################## ////