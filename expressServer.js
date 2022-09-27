var express = require('express');
var fs = require('fs');
var petData;
var urlPets;
var urlEndpoint;

var app = express();


app.use(express.json())



app.route('/pets')
    .get((req, res) => {
        fs.readFile('./pets.json', 'UTF-8', (error, data) => {
            if (error){
                console.error(new Error(error))
                res.status(503)
                res.end('Error: Not Found')
            } else {
                res.end(data)
            }
        })
    })


app.route('/pets/:index')
    .get((req, res) => {
        urlEndpoint = req.params.index
        fs.readFile('./pets.json', 'UTF-8', (error, data) => {
            petData = JSON.parse(data)
            if (error){
                console.error(new Error(error))
                res.status(503)
                res.end('Error: Not Found')
            } else {
                if (petData[urlEndpoint] == undefined){
                    console.error(new Error(error))
                    res.status(404)
                    res.end('Error: Not Found')
                } else {
                    res.end(JSON.stringify(petData[urlEndpoint]))
                }
            }
        })
    })

app.listen(8000, () => {
    console.log('Ready to pet')
});