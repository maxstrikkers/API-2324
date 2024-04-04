const closeByButton = document.getElementById('closeByButton');
const favoriteStationButton = document.getElementById('favoriteStations');
const searchButton = document.getElementById('searchStations');

closeByButton.addEventListener('click', function() {
    console.log('Close by button clicked');
});

favoriteStationButton.addEventListener('click', function() {
    console.log('Favorite station button clicked');
});

searchButton.addEventListener('click', function() {
    console.log('Search button clicked');
});


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        fetch('/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lat: lat, lng: lng }),
        });
    }, function(error) {
        console.error("Error occurred while getting location: " + error.message);
        // Gebruik de coördinaten van Amsterdam Centraal Station als fallback
        var lat = 52.3781;
        var lng = 4.9003;
        fetch('/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lat: lat, lng: lng }),
        });
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}