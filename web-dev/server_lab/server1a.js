"use strict";

var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    res.write('Hello dear user :) \n\n');

    // print the accessible files
    res.write('The accessible files/folders are : \n');
    const testFolder = './';
    var files = fs.readdirSync(testFolder);
    files.forEach(file => {
        res.write(file + '\n');
    });

    res.end();
}).listen(8000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8000/');