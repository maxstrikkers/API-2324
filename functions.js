const { response } = require("express");

async function getStationsByLocation(lat, lng) {
    try {
        const response = await fetch('https://gateway.apiportal.ns.nl/nsapp-stations/v2/nearest?lat='+ lat +'&lng=' + lng +'&limit=10&includeNonPlannableStations=false', {
            method: 'GET',
            // Request headers
            headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': process.env.NS_API_KEY,
            }
        });
        const stations = await response.json();
        return stations
    } catch (error) {
        console.error(error);
    }
}

async function getTrainTimes(station){
    try {
        const response = await fetch('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?station=' + station, {
            method: 'GET',
            // Request headers
            headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': process.env.NS_API_KEY,
            }
        });
        const trainTimes = await response.json();
        return trainTimes
    }
     catch (error) {
        console.error(error);
    }
}

async function getTrainInformation(train){
    try{
        const response = await fetch('https://gateway.apiportal.ns.nl/virtual-train-api/api/v1/trein?ids=' + train + '&features=zitplaats&all=false', {
            method: 'GET',
            // Request headers
            headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': process.env.NS_API_KEY,
            }
        });
        const trainInformation = await response.json();
        return trainInformation
    }
    catch (error) {
        console.error(error);
    }
};

async function getTrainRoute(train){
    try{
        const response = await fetch('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/journey?train=' + train, {
            method: 'GET',
            // Request headers
            headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': process.env.NS_API_KEY,
            }
        });
        const trainRoute = await response.json();
        return trainRoute
    }
    catch (error) {
        console.error(error);
    }
    return(response)
}

// EXPORTS ALL OF THE FUNCTIONS
module.exports = {
    getStationsByLocation,
    getTrainTimes,
    getTrainInformation,
    getTrainRoute
};