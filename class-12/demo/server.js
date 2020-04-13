'use strict';
require('dotenv').config();
const express = require('express');
const pg  = require('pg');

const app = express();
const PORT = process.env.PORT || 3030;

//Express middleware
app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');

const client = new pg.Client(process.env.DATABASE_URL);


app.get('/', getTasks);
app.get('/addTaskForm',showForm);
app.post('/add',addTask);
app.get('/tasks/:task_id', getTaskDetails);



function getTasks(req,res) {
    let SQL = 'SELECT * FROM tasks;';
    return client.query(SQL)
    .then(results =>{
        res.render('index',{taskResults:results.rows});
    })
}

function showForm (req,res) {
    res.render('addTask');
}

function addTask(req,res) {
    // let title = req.body.title;
    // console.log(title);
    let {title,status,category,contact,description} = req.body;
    let SQL = 'INSERT INTO tasks (title,description,contact,status,category) VALUES ($1,$2,$3,$4,$5);';

    let safeValues = [title,description,contact,status,category];
    return client.query(SQL,safeValues)
    .then (()=>{
        res.redirect('/');
    })
}

function getTaskDetails(req,res) {
    console.log(req.params.task_id);
    let SQL = 'SELECT * FROM tasks WHERE id=$1;';
    let values = [req.params.task_id];
    return client.query(SQL,values)
    .then (result =>{
        res.render('taskDetails',{task:result.rows[0]});
    })
}


client.connect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening on PORT ${PORT}`);
    })
})