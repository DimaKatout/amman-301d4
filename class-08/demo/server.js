'use strict';

//load the dependencies
const express = require('express');
// Load Environment Variables from the .env file
require('dotenv').config(); 
const cors = require('cors');
const pg =require('pg');


//Application setup
const app = express();
app.use(cors());
const PORT = process.env.PORT;

const client = new pg.Client(process.env.DATABASE_URL);


// ROUTES
app.get('/test', (request, response) => {
    response.status(200).send('ok'); 
});

// http://localhost:3000/people
app.get('/people',(request,response)=>{
    let SQL = 'SELECT * FROM people';
    client.query(SQL)
    .then(results =>{
        response.status(200).json(results.rows);
    })
    .catch (error => errorHandler(error));
})

// http://localhost:3000/add?fname=Razan&lname=Quran
app.get('/add',(request,response)=>{
    let firstName = request.query.fname;
    let lastName = request.query.lname;
    let safeValues = [firstName,lastName];
    let SQL = 'INSERT INTO people (first_name,last_name) VALUES ($1,$2)';
    client.query(SQL,safeValues)
    .then( results => {
        response.status(200).json(results.rows);
    })
    .catch (error => errorHandler(error));

})

// Error Handler
app.get('*', notFoundHandler);

//let's have another function to handle any errors
app.use(errorHandler);

function notFoundHandler(request,response) { 
    response.status(404).send('huh????');
}

function errorHandler(error, request, response) {
    response.status(500).send(error);
}

client.connect()
.then(()=>{
    app.listen(PORT, () =>
    console.log(`listening on ${PORT}`)
    );
})


