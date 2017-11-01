"use strict";
var http = require('http');
var https = require('https');
var qs = require('querystring');
var fs = require('fs');
var serverPort = 4430;
var users = [];

// same file content except for this section //////////////
http.createServer(function(req, res) {
    res.writeHead(301, {
        "Location": "https://" + req.headers['host'] + req.url
    });
    res.end();
}).listen(8000);
///////////////////////////////////////////////////////////

// notre the use of https server instead of the http server below: https.createServer .... 
https.createServer(function(request, response) {
    if (request.method === "GET") {

        if (qs.unescape(request.url.indexOf('?UserName=')) > -1) {

            if (qs.unescape(request.url).indexOf('<b>') > -1) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write('<!doctype html><html><head><title>response</title></head><body>');
                response.write('<meta http-equiv="content-type" content="text/html; charset=utf-8" />');
                response.write('Hello, please do not try to hack my website xD ');

                response.end('</body></html>');

            } else if (qs.unescape(request.url).indexOf('<script>') > -1) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write('<!doctype html><html><head><title>response</title></head><body>');
                response.write('<meta http-equiv="content-type" content="text/html; charset=utf-8" />');
                response.write('Hello, please do not try to hack my website xD ');

                response.end('</body></html>');

            }
            // general why to prevent adding html code 
            else if (qs.unescape(request.url).indexOf('<') > -1) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write('<!doctype html><html><head><title>response</title></head><body>');
                response.write('<meta http-equiv="content-type" content="text/html; charset=utf-8" />');
                response.write('Hello, please do not try to hack my website xD ');

                response.end('</body></html>');

            } else {



                var requestBody = request.url.substring(request.url.indexOf('?UserName=') + '?UserName='.length);




                var currentUser = qs.unescape(requestBody).replace('+', ' ');
                users.push(currentUser);

                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write('<!doctype html><html><head><title>response</title></head><body>');
                response.write('<meta http-equiv="content-type" content="text/html; charset=utf-8" />');
                response.write('Bonjour ' + qs.unescape(requestBody).replace('+', ' '));


                // ################ prinitng old users ################//
                users = users.filter(function(item, pos) {
                    return users.indexOf(item) == pos;
                });
                if (users.length === 1) {
                    response.write("<br>");
                    response.write("No one before you visited this page. (unique values printed here)")
                } else {

                    var text = "These users also visited this page : (unique values printed here) " + "<ul>";
                    for (var i = 0; i < users.length - 1; i++) {
                        text += "<li>" + users[i] + "</li>";
                    }
                    text += "</ul>";

                    response.write("<br>");
                    response.write(text);
                }
                // ################ end of prinitng old users ################//

                response.end('</body></html>');


            }
        } else {
            fs.readFile('exercice1c.html', function(err, data) {
                response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Content-Length': data.length
                });
                response.write(data);
                response.end();
            });
        }
    }
}).listen(serverPort);

console.log('Server running at localhost:' + serverPort);