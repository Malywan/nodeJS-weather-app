const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const weatherURL = `https://api.darksky.net/forecast/eb94ae238a2b3c672dfc70524c9a9273/${latitude},${longitude}?units=si`;

    request({ url: weatherURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature 
            + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
    
}

module.exports = forecast;

