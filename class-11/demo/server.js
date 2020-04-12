'use strict';

require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Specify a directory for static resources
app.use(express.static('./public'));

// convert a POST form data into a req.body
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/incoming',(req,res)=>{
    console.log('Get Request->  ',req.query);
    // res.status(200).send('ok');
    res.redirect('/welcome.html');
})

app.post('/incoming',(req,res)=>{
    console.log('Get Request->  ',req.body);
    // res.status(200).send('ok');
    res.redirect('/welcome.html');
})

app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})
