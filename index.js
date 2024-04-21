const express = require('express');
const path = require('path');
const { Liquid } = require('liquidjs');
const cookieParser = require('cookie-parser');
const app = express();
const { getStationsByLocation, getTrainTimes, getTrainInformation, getTrainRoute, searchForStation } = require('./functions');

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));


const engine = new Liquid({
    root: path.resolve(__dirname, 'views'),  // set templates location
    extname: '.liquid'  // set file extension
});

app.engine('liquid', engine.express()); // register liquid engine
app.set('views', path.resolve(__dirname, 'views')); // set views location
app.set('view engine', 'liquid'); // set liquid as the view engine

app.use(express.static('static'));

app.use(cookieParser());

// Specifieke route voor de service worker
app.get('/service-worker.js', (req, res) => {
    res.sendFile(__dirname + '/service-worker.js');
  });
  
  // Specifieke route voor het manifest
  app.get('/manifest.json', (req, res) => {
    res.sendFile(__dirname + '/manifest.json');
  });

app.get('/', async function (req, res) {
    let q
    let message = "Zoek naar station"
    if (req.query.q != undefined){
        if(req.query.q != req.cookies.q){
            q = req.query.q;
        } else{
            q = req.cookies.q;
        }
        res.cookie('q', req.query.q);
    }
    const stationData = await searchForStation(q)
    res.render('index', { message: message, q: q, stationData: stationData});
});

app.get('/nearby', async function (req, res) {
    let title = 'Nearby'
    let message = "Geef locatietoegang om stations in de buurt te kunnen zien"
    let lat, long;
    if (req.query.lat != undefined && req.query.long != undefined){
        if(req.query.lat != req.cookies.lat && req.query.long != req.cookies.long){
            lat = req.query.lat;
            long = req.query.long;
        } else{
            lat = req.cookies.lat;
            long = req.cookies.long;
        }
        res.cookie('lat', req.query.lat);
        res.cookie('long', req.query.long);
    }
    const stationData = await getStationsByLocation(lat, long);
    res.render('nearby', { title:title, message: message, stationData: stationData });
});


app.get('/favorites', async function (req, res) {
    let message = 'favorites'
    let likedStations = req.cookies.likedStations;
    let stationsToDisplay = [];

    if(likedStations != undefined){
        likedStations = JSON.parse(likedStations);
    }

    for (const station in likedStations) {
        const stationInfo =  await searchForStation(station);
        stationsToDisplay.push(stationInfo.payload[0]);
    }
    res.render('favorites', { message: message, stationData: stationsToDisplay });
});

app.get('/station/:code', async function(req, res){
    const trainTimes = await getTrainTimes(req.params.code);
    const stationName = await searchForStation(req.params.code);

    let likedStations = req.cookies.likedStations;
    let likedStatus = ''

    if(likedStations == undefined){
        likedStations = {};
    } else {
        likedStations = JSON.parse(likedStations);
    };
    
    if(req.params.code in likedStations){
        likedStatus = 'liked';
    } else {
        likedStatus = 'notLiked';
    }   
    // res.clearCookie('likedStations');

    res.render('station', { stationName: stationName.payload[0].namen.lang ,stationCode: req.params.code, times: trainTimes.payload.departures, likedStatus: likedStatus});
});

app.post('/station/:code', async function(req, res){
    const trainTimes = await getTrainTimes(req.params.code);
    const stationName = await searchForStation(req.params.code);
    let stationCode = stationName.payload[0].code;
    let likedStations = req.cookies.likedStations
    let likedStatus = ''

    // MAAKT EEN JSON OBJECT AAN ALS DE COOKIE LEEG IS OM DEZE LATER TE VULLEN
    if (likedStations) {
        likedStations = JSON.parse(likedStations);
    } else {
        likedStations = {};
    }

    if(!(stationCode in likedStations)){
        likedStations[stationCode] = true;
        likedStatus = 'liked';
        res.cookie('likedStations', JSON.stringify(likedStations));
    } else if((stationCode in likedStations)){
        delete likedStations[stationCode];
        likedStatus = 'notLiked';
        res.cookie('likedStations', JSON.stringify(likedStations));
    }
    res.render('station', { stationName: stationName.payload[0].namen.lang ,stationCode: req.params.code, times: trainTimes.payload.departures, likedStatus: likedStatus });
});

app.get('/station/traindetails/:train', async function(req, res){
    const trainInformation = await getTrainInformation(req.params.train);
    const trainRoute = await getTrainRoute(req.params.train);
    res.render('traindetails', { trainInformation: trainInformation[0], trainRoute: trainRoute.payload.stops, faciliteiten: trainInformation[0].materieeldelen[0]});
})

app.listen(5500);



