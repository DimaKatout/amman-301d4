'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

// Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.send('Home Page!');
});

// Route Definitions
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);


// Route Handlers

// function locationHandler2(request,response) {
//   const city = request.query.city;
//   let key = process.env.LOCATION_API_KEY;
//   const url  = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
//   superagent.get(url)
//   .then(geoData => {
//     const locationData = new Location(city, geoData.body);
//     response.status(200).json(locationData)
//   })
// }

function locationHandler(request, response) {

  const city = request.query.city;
  // let locationData = getLocation(city);
  // console.log(locationData);
  // response.status(200).json(locationData);
  getLocation(city)
  .then(locationData=> response.status(200).json(locationData));

}

function getLocation(city) {
  // const geoData = require('./data/geo.json');
  let key = process.env.LOCATION_API_KEY;
  const url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
  // $.get('./people.json')
  // .then(data =>)

  console.log('----------before the superagent');

  return superagent.get(url)
  .then(geoData =>{
    // console.log(geoData);
    const locationData = new Location(city, geoData.body);
    console.log('------------inside the superagent')
    return locationData;
  })

  console.log('------------after the superagent');


}

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}



function weatherHandler(request, response) {
  const city = request.query.search_query;
  // console.log('ffffffffffffffffffff',request.query)
  // console.log('aaaaaaaaaaaaaaaaaaaaa',city);
  // const weatherData = getWeather(city);
  // response.status(200).json(weatherData);
  getWeather(city)
  .then (weatherData => response.status(200).json(weatherData));
}


const weatherSummaries = [];

function getWeather(city) {

  // const geoData = require('./data/weather.json');
  let key = process.env.WEATHER_API_KEY;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`;
  console.log('ddddddddddddddddddddddddddddd',url);
  return superagent.get(url)
  .then(weatherData => {
    weatherData.body.data.forEach(val => {
      var weatherData = new Weather(val);
      weatherSummaries.push(weatherData);
    });
    return weatherSummaries;

  })

}


function Weather(day) {
  this.forecast = day.weather.description;
    // this.time = new Date(day.valid_date).toString().slice(0,15);
    this.time = day.valid_date;
}



// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
