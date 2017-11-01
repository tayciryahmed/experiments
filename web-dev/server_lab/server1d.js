"use strict";
var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var path = require('path');
var url = require('url');
var serverPort = 8000;
var users = [];

http.createServer(function(request, response) {
    //// ###### this section is where handling files requests is implemented : ###### //////
    //// ###### Exactly the same as before - For the treatement related to the question 1d see below  ###### //////
    if (qs.unescape(request.url).indexOf('.') > -1) {
        // parse URL
        const parsedUrl = url.parse(request.url);
        // extract URL path
        let pathname = `.${parsedUrl.pathname}`;
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        const ext = path.parse(pathname).ext;
        // maps file extention to MIME typere
        const map = {
            '.ico': 'image/x-icon',
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.json': 'application/json',
            '.css': 'text/css',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.wav': 'audio/wav',
            '.mp3': 'audio/mpeg',
            '.svg': 'image/svg+xml',
            '.pdf': 'application/pdf',
            '.doc': 'application/msword'
        };

        fs.exists(pathname, function(exist) {
            if (!exist) {
                // if the file is not found, return 404
                response.statusCode = 404;
                response.end();
                return;
            }

            // if is a directory search for index file matching the extention
            if (fs.statSync(pathname).isDirectory()) {
                response.write('works\n\n');
                response.write('The accessible files/directories are : \n');
                const testFolder = './' + pathname;
                var files = fs.readdirSync(testFolder);
                files.forEach(file => {
                    response.write(file + '\n');
                });

                response.end();

            }
            // read file from file system
            fs.readFile(pathname, function(err, data) {
                if (err) {
                    response.statusCode = 500;
                    response.end(`Error getting the file: ${err}.`);
                } else {
                    // if the file is found, set Content-type and send data
                    response.setHeader('Content-type', map[ext] || 'text/plain');
                    response.end(data);
                }
            });
        });
    }
    //// ###### End of section is where handling files requests is implemented ###### //////
    else if (request.method === "GET") {

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