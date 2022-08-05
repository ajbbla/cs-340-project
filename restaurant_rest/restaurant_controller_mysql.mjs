// citation: node express framework adapted from Oregon State University, CS290, Module 3 - HTML and Introduction to Express, Module 6 - More Javascript and Express, Module 8 - HTTP, Cookies, Sessions, REST API, Spring 2022
// citation: mysql connection pool adapted from Oregon State University, CS340, Activity 2 - Connect Web App to Database , Summer 2022

import 'dotenv/config';
import express from 'express';
// Get an instance of mysql we can use in the app
import mysql from 'mysql';
// import * as db from './database/db-connector.mjs';
// import * as r_model from './restaurant_model_mysql.mjs';

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_blantona',
    password        : '4032',
    database        : 'cs340_blantona'
})

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// /**
//  * Retrieve all orders
//  */
app.get('/orders', (req, res) => {
    let query1 = "SELECT * FROM Orders;";
    pool.query(query1, (error, rows, fields) => {
        res.send(rows);
    })
});

// /**
//  * Create a new order with the dateTime, totalPrice, serverID provided in the body
//  * dateTime, totalPrice:Number(totalPrice), serverID:Number(serverID)
//  */
app.post('/orders', (req, res) => {
    let query2 = `INSERT INTO Orders (dateTime, totalPrice, serverID) VALUES ('${req.body.dateTime}', ${req.body.totalPrice}, ${req.body.serverID});`;
    console.log(query2);
    pool.query(query2, (error, row, fields) => {
        res.status(201).json(row);
    })
});

app.put('/orders/:_id', (req, res) => {
    let query3 = `UPDATE Orders SET dateTime = '${req.body.dateTime}', totalPrice = ${req.body.totalPrice}, serverID = ${req.body.serverID} WHERE orderID = ${req.body.orderID};`;
    console.log(query3);
    pool.query(query3, (error, row, fields) => {
        res.send();
    })
});

app.delete('/orders/:_id', (req, res) => {
    let query4 = `DELETE FROM Orders WHERE orderID = ${req.params._id};`;
    pool.query(query4, (error, row, fields) => {
        res.status(204).send();
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
