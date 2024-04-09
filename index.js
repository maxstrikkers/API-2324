const express = require('express');
const path = require('path');
const { Liquid } = require('liquidjs');
const app = express();
const { getStationsByLocation, getTrainTimes } = require('./functions');

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
    let message = "Home page"
    res.render('index', { message: message });
});

app.get('/nearby', async function (req, res) {
    let message = 'Nearby'
    const stationData = await getStationsByLocation(req.query.lat, req.query.long);
    res.render('nearby', { message: message, stationData: stationData.payload });
});

app.get('/search', function (req, res) {
    let message = 'Search'
    res.render('search', { message: message });
});

app.get('/favorites', function (req, res) {
    let message = 'favorites'
    res.render('favorites', { message: message });
});

app.get('/station/:code', async function(req, res){
    const trainTimes = await getTrainTimes(req.params.code);
    console.log(trainTimes.payload)
    // const stationData = await getStationData(stationName); // Haal de station gegevens op
    res.render('station', { station: req.params.code, times: trainTimes.payload.departures });
})

app.listen(5500);

