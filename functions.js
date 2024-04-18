const { response } = require("express");

async function fetchData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': process.env.NS_API_KEY,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getStationsByLocation(lat, lng) {
    if((lat == undefined || lat == "") && (lng == undefined || lng == "")){
        return "No Location Access"
    } else {
        const url = 'https://gateway.apiportal.ns.nl/nsapp-stations/v2/nearest?lat='+ lat +'&lng=' + lng +'&limit=5&includeNonPlannableStations=false';
        const stations = await fetchData(url);
        return stations;
    }
}

async function getTrainTimes(station){
    const url = 'https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?station=' + station;
    const trainTimes = await fetchData(url);
    return trainTimes;
}

async function getTrainInformation(train){
    const url = 'https://gateway.apiportal.ns.nl/virtual-train-api/api/v1/trein?ids=' + train + '&features=zitplaats&all=false';
    const trainInformation = await fetchData(url);
    return trainInformation;
}

async function getTrainRoute(train){
    const url = 'https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/journey?train=' + train;
    const trainRoute = await fetchData(url);
    return trainRoute;
}

async function searchForStation(query){
    const url = "https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations?q=" + query +"&countryCodes=NL&limit=5"
    const stations = await fetchData(url);
    return stations
}

// EXPORTS ALL OF THE FUNCTIONS
module.exports = {
    getStationsByLocation,
    getTrainTimes,
    getTrainInformation,
    getTrainRoute,
    searchForStation
};