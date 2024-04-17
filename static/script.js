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
                latInput.value = 52.3781;
                longInput.value = 4.9003;
                locationForm.submit();
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    });
}

if (window.location.pathname.includes('/station/')) {
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const huidigeTijd = document.getElementById('huidigeTijd');
    huidigeTijd.textContent = time;
}