'use strict';

var http = require('http');
var port = process.env.PORT || 8000;
var fs = require('fs');
var urlEndpoint;
var urlPets;
var petsData;


const server = http.createServer((req, res) => {
    urlPets = req.url.substring(0,5);
    urlEndpoint = req.url.substring(6);
    if (req.method == 'GET' && req.url == '/pets' || req.url == `${urlPets}/${urlEndpoint}`){
        fs.readFile('./pets.json', 'UTF-8', (error, data) => {
            petsData = JSON.parse(data);
            if (error){
                console.error(new Error(error))
            } else if(req.url == `${urlPets}/${urlEndpoint}`){
                if (!petsData[urlEndpoint]){
                    res.statusCode = 404
                    res.end('Error: Not Found')
                } else {
                    res.setHeader('Content-type', 'application/json')
                    res.end(JSON.stringify(petsData[urlEndpoint]))
                }
            } else {
                res.setHeader('Content-type', 'application/json')
                res.end(data)
            }
        })
    } else {
        res.statusCode = 404
        res.end('Error: Not Found')
    }
});

server.listen(port, () => {
    console.log('Listening on port', port)
});

