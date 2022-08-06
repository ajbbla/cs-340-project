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
/*    
    host            : 'localhost',
    user            : 'root',
    password        : 'dV&SX#Gq@DQZ*m2&8XRh',
    database        : 'restaurant'
*/
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
    pool.query(query2, (error, row, fields) => {
        res.status(201).json(row);
    })
});

app.put('/orders/:_id', (req, res) => {
    let query3 = `UPDATE Orders SET dateTime = '${req.body.dateTime}', totalPrice = ${req.body.totalPrice}, serverID = ${req.body.serverID} WHERE orderID = ${req.body.orderID};`;
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

// /**
//  * Retrieve all dishes
//  */
app.get('/dishes', (req, res) => {
    let query1 = "SELECT * FROM Dishes;";
    pool.query(query1, (error, rows, fields) => {
        res.send(rows);
    })
});

// /**
//  * Create a new dish with the dateTime, totalPrice, serverID provided in the body
//  * dateTime, totalPrice:Number(totalPrice), serverID:Number(serverID)
//  */
app.post('/dishes', (req, res) => {
    let query2 = `INSERT INTO Dishes (dishName, price, spiceLevel, currentMenu, stockLevel) VALUES ('${req.body.dishName}', ${req.body.price}, ${req.body.spiceLevel}, ${req.body.currentMenu}, '${req.body.stockLevel}');`;
    pool.query(query2, (error, row, fields) => {
        res.status(201).json(row);
    })
});

app.put('/dishes/:_id', (req, res) => {
    let query3 = `UPDATE Dishes SET dishName = '${req.body.dishName}', price = ${req.body.price}, spiceLevel = ${req.body.spiceLevel}, currentMenu = ${req.body.currentMenu}, stockLevel = '${req.body.stockLevel}' WHERE dishID = ${req.body.dishID};`;
    pool.query(query3, (error, row, fields) => {
        res.send();
    })
});

app.delete('/dishes/:_id', (req, res) => {
    let query4 = `DELETE FROM Dishes WHERE dishID = ${req.params._id};`;
    pool.query(query4, (error, row, fields) => {
        res.status(204).send();
    })
});

// /**
//  * Retrieve all ingredients
//  */
app.get('/ingredients', (req, res) => {
    let query1 = "SELECT * FROM Ingredients;";
    pool.query(query1, (error, rows, fields) => {
        res.send(rows);
    })
});

// /**
//  * Create a new ingredient with the ingredientName, color, plantFamily, foodGroup, 
//    avgShelfLifeDays, spiceLevel, currentIngredient, currentStockQty provided in the body
//  * ingredientName, color, plantFamily, foodGroup, avgShelfLifeDays:Number(avgShelfLifeDays), 
//    spiceLevel:Number(spiceLevel), currentIngredient:Number(currentIngredient), 
//    currentStockQty:Number(currentStockQty)
//  */
app.post('/ingredients', (req, res) => {
    let query2 = `INSERT INTO Ingredients (ingredientName, color, plantFamily, foodGroup, avgShelfLifeDays, spiceLevel, currentIngredient, currentStockQty) VALUES ('${req.body.ingredientName}', '${req.body.color}', '${req.body.plantFamily}', '${req.body.foodGroup}', ${req.body.avgShelfLifeDays}, ${req.body.spiceLevel}, ${req.body.currentIngredient}, ${req.body.currentStockQty});`;
    pool.query(query2, (error, row, fields) => {
        res.status(201).json(row);
    })
});

app.put('/ingredients/:_id', (req, res) => {
    let query3 = `UPDATE Ingredients SET ingredientName = '${req.body.ingredientName}', color = '${req.body.color}', plantFamily = '${req.body.plantFamily}', foodGroup = '${req.body.foodGroup}', avgShelfLifeDays = ${req.body.avgShelfLifeDays}, spiceLevel = ${req.body.spiceLevel}, currentIngredient = ${req.body.currentIngredient}, currentStockQty = ${req.body.currentStockQty} WHERE ingredientID = ${req.body.ingredientID};`;
    pool.query(query3, (error, row, fields) => {
        res.send();
    })
});

app.delete('/ingredients/:_id', (req, res) => {
    let query4 = `DELETE FROM Ingredients WHERE ingredientID = ${req.params._id};`;
    pool.query(query4, (error, row, fields) => {
        res.status(204).send();
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
