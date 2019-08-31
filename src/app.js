const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
//Setting up the port to use, Heroku's port OR the 3000 port in case Heroku is down
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setting up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// exposes a directory or a file to a particular URL so it's contents can be publicly accessed.
// Setting up a static directory to serve
app.use(express.static(publicDirPath))

// Sets a page request handler for the root route
app.get('', (req, res) => {
    res.render('index', { // Pagename
        title: "Weather app", // Dynamic values passed to handblebars
        author: 'Ly'
    });
})

// Sets a page request handler for the about route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        content: "About page's content",
        author: 'Ly'
    })
})

//Setting up page "handlers" (controllers)
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        welcomeMessage: "Welcome to the help section",
        author: 'Ly'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: 'Help page',
        errorMessage: 'Error 404 : Help page not found',
        author: 'Ly'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){ // Check if address is provided, else send error msg
        return res.send({
            error: 'Error : You must provide an adress !'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, placeName} = {}) => {
        if(error){ // Handle geocode error
            return res.send({error})
        }

        // Requesting forecast data
        forecast(latitude, longitude, (error, forecastResponse) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastResponse,
                placeName,
                address: req.query.address
            })
        })

    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        errorMessage: 'Error 404 page not found',
        author: 'Ly'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})