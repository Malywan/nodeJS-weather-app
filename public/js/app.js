console.log("JS file loaded");

const weatherForm = document.querySelector('form');
const locationField = document.querySelector('#location')
const forecast = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    forecast.className='flow-text'
    forecast.textContent = 'Loading forecast ...'
    //console.log(locationField.value)
    // We ommit the https://localhost:3000 to make the port flexible and deploy the app online
    fetch(`/weather?address=${locationField.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                forecast.className='flow-text red-text'
                forecast.textContent = data.error;
            } else {
                forecast.className='flow-text blue-text'
                forecast.textContent = `${data.placeName}. ${data.forecast}`;
            }
        })
    })

})