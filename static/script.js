if (window.location.pathname.includes('/nearby')) {
    const locationForm = document.getElementById('locationForm');
    const latInput = document.getElementById('latInput');
    const longInput = document.getElementById('longInput');

    locationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                latInput.value = position.coords.latitude;
                longInput.value = position.coords.longitude;
                locationForm.submit();
            }, function(error) {
                locationForm.submit();
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    });
}