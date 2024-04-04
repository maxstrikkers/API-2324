async function getStationsByLocation(lat, lng) {
    console.log("Latitude: " + lat + ", Longitude: " + lng);
    try {
        const response = await fetch('https://gateway.apiportal.ns.nl/nsapp-stations/v2/nearest?lat='+ lat +'&lng=' + lng +'&limit=10&includeNonPlannableStations=false', {
            method: 'GET',
            // Request headers
            headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': process.env.NS_API_KEY,
            }
        });
        console.log(response.status);
        const json = await response.json();
        json.payload.forEach(station => {
            console.log(station.namen.lang);
            console.log('joee')
        });
        // console.log(json.payload);
    } catch (err) {
        console.error(err);
    }
}

// EXPORTS ALL OF THE FUNCTIONS
module.exports = {
    getStationsByLocation
};