const express = require('express');
const path = require('path');
const { Liquid } = require('liquidjs');
const cookieParser = require('cookie-parser');
const app = express();
const { getStationsByLocation, getTrainTimes, getTrainInformation, getTrainRoute, searchForStation } = require('./functions');

require('dotenv').config();

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


app.get('/favorites', function (req, res) {
    let message = 'favorites'
    res.render('favorites', { message: message });
});

app.get('/station/:code', async function(req, res){
    const trainTimes = await getTrainTimes(req.params.code);
    const stationName = await searchForStation(req.params.code);
    console.log(req.query)
    const likeStatus = 'liked'
    
    // Read the existing list from the cookie
    let likedList = req.cookies.liked ? JSON.parse(req.cookies.liked) : [];

    if(likeStatus == 'liked'){
        // Check if the station is not already in the list
        if (!likedList.includes(req.params.code)) {
            likedList.push(req.params.code);
            let likedListJSON = JSON.stringify(likedList);
            res.cookie('liked', '');
        }
    }
    console.log(req.cookies.liked)
    res.render('station', { stationName: stationName.payload[0].namen.lang ,stationCode: req.params.code, times: trainTimes.payload.departures, likedStatus: 'liked' });
});

app.get('/station/traindetails/:train', async function(req, res){
    const trainInformation = await getTrainInformation(req.params.train);
    const trainRoute = await getTrainRoute(req.params.train);
    res.render('traindetails', { trainInformation: trainInformation[0], trainRoute: trainRoute.payload.stops, faciliteiten: trainInformation[0].materieeldelen[0].faciliteiten});
})

app.listen(5500);



