"use strict";
var path = require('path');
var url = require('url');
var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var serverPort = 8000;


http.createServer(function(request, response) {

    // i use indexOf('.') because it detects the presence of a file extension in the url 
    // that way i can keep the files serving working inthe same server 

    if (qs.unescape(request.url).indexOf('.') > -1) {

        //// ###### section  where handling files requests is implemented ###### //////
        //// ###### Exactly the same as before - For the GET request handling see below  ###### //////

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

    //// ###### section where handling GET REQUESTS ###### //////
    else if (request.method === "GET") {

        if (request.url.indexOf('?UserName=') > -1) {


            var requestBody = request.url.substring(request.url.indexOf('?UserName=') + '?UserName='.length);

            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write('<!doctype html><html><head><title>response</title></head><body>');
            response.write('<meta http-equiv="content-type" content="text/html; charset=utf-8" />');
            response.write('Bonjour ' + qs.unescape(requestBody).replace('+', ' '));

            response.end('</body></html>');

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

    //// ###### END OF section where handling GET REQUESTS ###### //////

}).listen(serverPort);

console.log('Server running at localhost:' + serverPort);