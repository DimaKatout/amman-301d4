'use strict';

const express = require('express');

//CORS = Cross Origin Resource Sharing
const cors = require('cors');

// DOTENV (Read our Enviroment Variable)
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const server = express();

server.use(cors());

server.listen(PORT, () => {
    console.log(`Listening on PORT${PORT}`);
})

// handle any route
// localhost:3000/
server.get('/', (request, response) => {
    response.status(200).send('it works');
})




// localhost:3000/location?city=Lynnwood
server.get('/location', (req, res) => {
    // fetch the data from geo.json file
    // serach-query = > city
    // formatted_query
    // latitude
    // longitude
    // const geoData = require('./data/geo.json');
    const geoData = require('./data/geo2.json');
    const city = req.query.city;
    const locationData = new Location(city,geoData);
    res.send(locationData);

})

function Location (city,geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
    // this.formatted_query = geoData.results[0].formatted_address;
    // this.latitude = geoData.results[0].geometry.location.lat;
    // this.longitude = geoData.results[0].geometry.location.lng;
}

// localhost:3000/anything
server.use('*', (req, res) => {
    res.status(404).send('NOT FOUND');
});

server.use((error, req, res) => {
    res.status(500).send(error);
})