const request = require('request');

const geocode = (address, callback) => {
    const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibHlmcm9zdCIsImEiOiJjanl3dGY4ZDEwcHo3M2JvYnNxbWlqYnQ4In0.WeufbcnnqDFnT0opRMA6EQ&limit=1`;
    request({url: URL, json: true}, (error, response) => {
        if(error){
            //we handle error with a call to the callback function for more flexibility
            callback('Unable to connect to location services !', undefined);
        } else if(response.body.features.length === 0) {
            callback('Unable to find location, try another search', undefined);
        } else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                placeName: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;