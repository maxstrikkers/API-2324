const express = require('express');
const path = require('path');
const { Liquid } = require('liquidjs');
const app = express();
const { getStationsByLocation } = require('./functions');

require('dotenv').config();

const engine = new Liquid({
    root: path.resolve(__dirname, 'views'),  // set templates location
    extname: '.liquid'  // set file extension
});

app.engine('liquid', engine.express()); // register liquid engine
app.set('views', path.resolve(__dirname, 'views')); // set views location
app.set('view engine', 'liquid'); // set liquid as the view engine

app.use(express.static('static'));

app.get('/', function (req, res) {
    res.render('index', { message: 'Heeeellllo World' });
});


// GETS THE LOCATION FROM THE CLIENT
app.post('/location', express.json(), function (req, res) {
    let lat = req.body.lat;
    let lng = req.body.lng;
    getStationsByLocation(lat, lng);
    console.log("Latitude: " + lat + ", Longitude: " + lng);
    res.sendStatus(200);
});

app.listen(5500);

