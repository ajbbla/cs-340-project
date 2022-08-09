// citation: node express framework adapted from Oregon State University, CS290, Module 3 - HTML and Introduction to Express, Module 6 - More Javascript and Express, Module 8 - HTTP, Cookies, Sessions, REST API, Spring 2022
// citation: mysql connection pool adapted from Oregon State University, CS340, Activity 2 - Connect Web App to Database , Summer 2022

import 'dotenv/config';
import express from 'express';
// Get an instance of mysql we can use in the app
import mysql from 'mysql';

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_blantona',
    password        : '4032',
    database        : 'cs340_blantona'
})

// Create a 'connection pool' using the provided credentials
// var pool = mysql.createPool({
//     connectionLimit : 10,   
//     host            : 'localhost',
//     user            : 'root',
//     password        : 'dV&SX#Gq@DQZ*m2&8XRh',
//     database        : 'restaurant'
// })

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// Retrieve all Orders, displaying Servers.serverName instead of Orders.serverID
app.get('/orders', (req, res) => {
    let query1 = `SELECT orderID, dateTime, totalPrice, serverName FROM Orders
    LEFT JOIN Servers ON Orders.serverID = Servers.serverID ORDER BY dateTime DESC;`;
    pool.query(query1, (error, rows, fields) => {
        res.send(rows);
    })
});

// Create an Order; allows for a NULL value for the M:1 relationship with Servers
app.post('/orders', (req, res) => {
    let query2 = '';
    if (req.body.serverName === 'NULL') {
        query2 = `INSERT INTO Orders (dateTime, totalPrice, serverID) VALUES ('${req.body.dateTime}', ${req.body.totalPrice}, NULL);`;
    } else {
        query2 = `INSERT INTO Orders (dateTime, totalPrice, serverID) VALUES ('${req.body.dateTime}', ${req.body.totalPrice}, (SELECT serverID FROM Servers WHERE serverName = '${req.body.serverName}'));`;
    }
    pool.query(query2, (error, row, fields) => {
        res.status(201).json(row);
    })
});

// Update an Order by orderID
app.put('/orders/:_id', (req, res) => {
    let query3 = '';
    if (req.body.serverName === 'NULL') {
        query3 = `UPDATE Orders SET dateTime = '${req.body.dateTime}', totalPrice = ${req.body.totalPrice}, serverID = NULL WHERE orderID = ${req.body.orderID};`;
    } else {
        query3 = `UPDATE Orders SET dateTime = '${req.body.dateTime}', totalPrice = ${req.body.totalPrice}, serverID = (SELECT serverID FROM Servers WHERE serverName = '${req.body.serverName}') WHERE orderID = ${req.body.orderID};`;
    }
    pool.query(query3, (error, row, fields) => {
        res.send();
    })
});

// Delete an Order by orderID
app.delete('/orders/:_id', (req, res) => {
    let query4 = `DELETE FROM Orders WHERE orderID = ${req.params._id};`;
    pool.query(query4, (error, row, fields) => {
        res.status(204).send();
    })
});

// Retrieve all dishes
app.get('/dishes', (req, res) => {
    let query1 = "SELECT * FROM Dishes ORDER BY dishName ASC;";
    pool.query(query1, (error, rows, fields) => {
        res.send(rows);
    })
});

// Filter Dishes by Ingredient
app.get('/dishesByIngredient/:ingredientName', (req, res) => {
    let query1 = `SELECT Dishes.dishID, dishName, price, Dishes.spiceLevel, currentMenu, stockLevel FROM Dishes
    JOIN DishIngredients ON Dishes.dishID = DishIngredients.dishID
    JOIN Ingredients ON DishIngredients.ingredientID = Ingredients.ingredientID
    WHERE ingredientName = '${req.params.ingredientName}' ORDER BY dishName ASC;`;
    pool.query(query1, (error, rows, fields) => {
        res.send(rows);
    })
});

// Create a Dish
app.post('/dishes', (req, res) => {
    let query2 = `INSERT INTO Dishes (dishName, price, spiceLevel, currentMenu, stockLevel) VALUES ('${req.body.dishName}', ${req.body.price}, ${req.body.spiceLevel}, ${req.body.currentMenu}, '${req.body.stockLevel}');`;
    pool.query(query2, (error, row, fields) => {
        res.status(201).json(row);
    })
});

// Update a Dish by dishID
app.put('/dishes/:_id', (req, res) => {
    let query3 = `UPDATE Dishes SET dishName = '${req.body.dishName}', price = ${req.body.price}, spiceLevel = ${req.body.spiceLevel}, currentMenu = ${req.body.currentMenu}, stockLevel = '${req.body.stockLevel}' WHERE dishID = ${req.body.dishID};`;
    pool.query(query3, (error, row, fields) => {
        res.send();
    })
});

// Delete a Dish by dishID
app.delete('/dishes/:_id', (req, res) => {
    let query4 = `DELETE FROM Dishes WHERE dishID = ${req.params._id};`;
    pool.query(query4, (error, row, fields) => {
        res.status(204).send();
    })
});

// Retrieve all Ingredients
app.get('/ingredients', (req, res) => {
    let query1 = "SELECT * FROM Ingredients ORDER BY ingredientName ASC;";
    pool.query(query1, (error, rows, fields) => {
        res.send(rows);
    })
});

// Create an Ingredient
app.post('/ingredients', (req, res) => {
    let query2 = `INSERT INTO Ingredients (ingredientName, color, plantFamily, foodGroup, avgShelfLifeDays, spiceLevel, currentIngredient, currentStockQty) VALUES ('${req.body.ingredientName}', '${req.body.color}', '${req.body.plantFamily}', '${req.body.foodGroup}', ${req.body.avgShelfLifeDays}, ${req.body.spiceLevel}, ${req.body.currentIngredient}, ${req.body.currentStockQty});`;
    pool.query(query2, (error, row, fields) => {
        res.status(201).json(row);
    })
});

// Update an Ingredient by ingredientID
app.put('/ingredients/:_id', (req, res) => {
    let query3 = `UPDATE Ingredients SET ingredientName = '${req.body.ingredientName}', color = '${req.body.color}', plantFamily = '${req.body.plantFamily}', foodGroup = '${req.body.foodGroup}', avgShelfLifeDays = ${req.body.avgShelfLifeDays}, spiceLevel = ${req.body.spiceLevel}, currentIngredient = ${req.body.currentIngredient}, currentStockQty = ${req.body.currentStockQty} WHERE ingredientID = ${req.body.ingredientID};`;
    pool.query(query3, (error, row, fields) => {
        res.send();
    })
});

// Delete an Ingredient by ingredientID
app.delete('/ingredients/:_id', (req, res) => {
    let query4 = `DELETE FROM Ingredients WHERE ingredientID = ${req.params._id};`;
    pool.query(query4, (error, row, fields) => {
        res.status(204).send();
    })
});

// Retrieve all OrderDishes, displaying Dishes.dishName instead of OrderDishes.dishID
app.get('/orderDishes', (req, res) => {
    let query1 = `SELECT orderDishID, orderID, dishName, quantity FROM OrderDishes
    JOIN Dishes ON OrderDishes.dishID = Dishes.dishID ORDER BY orderID ASC;`;
    pool.query(query1, (error, rows, fields) => {
        res.send(rows);
    })
});

// Create an OrderDish
app.post('/orderDishes', (req, res) => {
    let query2 = `INSERT INTO OrderDishes (orderID, dishID, quantity) VALUES (${req.body.orderID}, (SELECT dishID FROM Dishes WHERE dishName = '${req.body.dishName}'), ${req.body.quantity});`;
    pool.query(query2, (error, row, fields) => {
        res.status(201).json(row);
    })
});

// Update an OrderDish by orderDishID
app.put('/orderDishes/:_id', (req, res) => {
    let query3 = `UPDATE OrderDishes SET orderID = ${req.body.orderID}, dishID = (SELECT dishID FROM Dishes WHERE dishName = '${req.body.dishName}'), quantity = ${req.body.quantity} WHERE orderDishID = ${req.body.orderDishID};`;
    pool.query(query3, (error, row, fields) => {
        res.send();
    })
});

// Delete an OrderDish by orderDishID
app.delete('/orderDishes/:_id', (req, res) => {
    let query4 = `DELETE FROM OrderDishes WHERE orderDishID = ${req.params._id};`;
    pool.query(query4, (error, row, fields) => {
        res.status(204).send();
    })
});

// Retrieve all servers
app.get('/servers', (req, res) => {
    let query1 = "SELECT * FROM Servers ORDER BY serverName ASC;";
    pool.query(query1, (error, rows, fields) => {
        res.send(rows);
    })
});

// Create a Server
app.post('/servers', (req, res) => {
    let query2 = `INSERT INTO Servers (serverName, hireDate, wagePerHour, isFullTime) VALUES ('${req.body.serverName}', '${req.body.hireDate}', ${req.body.wagePerHour}, ${req.body.isFullTime});`;
    console.log(query2);
    pool.query(query2, (error, row, fields) => {
        res.status(201).json(row);
    })
});

// Update a Server by serverID
app.put('/servers/:_id', (req, res) => {
    let query3 = `UPDATE Servers SET serverName = '${req.body.serverName}', hireDate = '${req.body.hireDate}', wagePerHour = ${req.body.wagePerHour}, isFullTime = ${req.body.isFullTime} WHERE serverID = ${req.body.serverID};`;
    console.log(query3);
    pool.query(query3, (error, row, fields) => {
        res.send();
    })
});

// Delete a Server by serverID
app.delete('/servers/:_id', (req, res) => {
    let query4 = `DELETE FROM Servers WHERE serverID = ${req.params._id};`;
    pool.query(query4, (error, row, fields) => {
        res.status(204).send();
    })
});

// Retrieve all Suppliers
app.get('/suppliers', (req, res) => {
    let query1 = "SELECT * FROM Suppliers ORDER BY supplierName ASC;";
    pool.query(query1, (error, rows, fields) => {
        res.send(rows);
    })
});

// Create a Supplier
app.post('/suppliers', (req, res) => {
    let query2 = `INSERT INTO Suppliers (supplierName, city, state, streetAddress, contactName, contactPhone, contactEmail) VALUES ('${req.body.supplierName}', '${req.body.city}', '${req.body.state}', '${req.body.streetAddress}', '${req.body.contactName}', '${req.body.contactPhone}', '${req.body.contactEmail}');`;
    console.log(query2);
    pool.query(query2, (error, row, fields) => {
        res.status(201).json(row);
    })
});

// Update a Supplier by supplierID
app.put('/suppliers/:_id', (req, res) => {
    let query3 = `UPDATE Suppliers SET supplierName = '${req.body.supplierName}', city = '${req.body.city}', state = '${req.body.state}', streetAddress = '${req.body.streetAddress}', contactName = '${req.body.contactName}', contactPhone = '${req.body.contactPhone}', contactEmail = '${req.body.contactEmail}' WHERE supplierID = ${req.body.supplierID};`;
    console.log(query3);
    pool.query(query3, (error, row, fields) => {
        res.send();
    })
});

// Delete a Supplier by supplierID
app.delete('/suppliers/:_id', (req, res) => {
    let query4 = `DELETE FROM Suppliers WHERE supplierID = ${req.params._id};`;
    pool.query(query4, (error, row, fields) => {
        res.status(204).send();
    })
});

// Retrieve all DishIngredients, displaying dishName and ingredientName
app.get('/dishIngredients', (req, res) => {
    let query1 = `SELECT dishIngredientID, dishName, ingredientName, gramQty, isRaw FROM DishIngredients
    JOIN Dishes ON DishIngredients.dishID = Dishes.dishID
    JOIN Ingredients ON DishIngredients.ingredientID = Ingredients.ingredientID ORDER BY dishName ASC;`;
    pool.query(query1, (error, rows, fields) => {
        res.send(rows);
    })
});

// Create a DishIngredient
app.post('/dishIngredients', (req, res) => {
    let query2 = `INSERT INTO DishIngredients (dishID, ingredientID, gramQty, isRaw) VALUES ((SELECT dishID FROM Dishes WHERE dishName = '${req.body.dishName}'), (SELECT ingredientID FROM Ingredients WHERE ingredientName = '${req.body.ingredientName}'), ${req.body.gramQty}, ${req.body.isRaw});`;
    pool.query(query2, (error, row, fields) => {
        res.status(201).json(row);
    })
});

// Update a DishIngredient by dishIngredientID
app.put('/dishIngredients/:_id', (req, res) => {
    let query3 = `UPDATE DishIngredients SET dishID = (SELECT dishID FROM Dishes WHERE dishName = '${req.body.dishName}'), ingredientID = (SELECT ingredientID FROM Ingredients WHERE ingredientName = '${req.body.ingredientName}'), gramQty = ${req.body.gramQty}, isRaw = ${req.body.isRaw} WHERE dishIngredientID = ${req.body.dishIngredientID};`;
    pool.query(query3, (error, row, fields) => {
        res.send();
    })
});

// Delete a DishIngredient by dishIngredientID
app.delete('/dishIngredients/:_id', (req, res) => {
    let query4 = `DELETE FROM DishIngredients WHERE dishIngredientID = ${req.params._id};`;
    pool.query(query4, (error, row, fields) => {
        res.status(204).send();
    })
});

// Retrieve all Purchases, displaying supplierName and ingredientName
app.get('/purchases', (req, res) => {
    let query1 = `SELECT purchaseID, supplierName, ingredientName, costPerGram, gramQtyPurchased, purchaseDate, actualShelfLifeDays FROM Purchases
    JOIN Suppliers ON Purchases.supplierID = Suppliers.supplierID
    JOIN Ingredients ON Purchases.ingredientID = Ingredients.ingredientID ORDER BY purchaseDate DESC;`;
    pool.query(query1, (error, rows, fields) => {
        res.send(rows);
    })
});

// Create a Purchase
app.post('/purchases', (req, res) => {
    let query2 = `INSERT INTO Purchases (supplierID, ingredientID, costPerGram, gramQtyPurchased, purchaseDate, actualShelfLifeDays) VALUES ((SELECT supplierID FROM Suppliers WHERE supplierName = '${req.body.supplierName}'), (SELECT ingredientID FROM Ingredients WHERE ingredientName = '${req.body.ingredientName}'), ${req.body.costPerGram}, ${req.body.gramQtyPurchased}, '${req.body.purchaseDate}', ${req.body.actualShelfLifeDays});`;
    pool.query(query2, (error, row, fields) => {
        res.status(201).json(row);
    })
});

// Update a Purchase by purchaseID
app.put('/purchases/:_id', (req, res) => {
    let query3 = `UPDATE Purchases SET supplierID = (SELECT supplierID FROM Suppliers WHERE supplierName = '${req.body.supplierName}'), ingredientID = (SELECT ingredientID FROM Ingredients WHERE ingredientName = '${req.body.ingredientName}'), costPerGram = ${req.body.costPerGram}, gramQtyPurchased = ${req.body.gramQtyPurchased}, purchaseDate = '${req.body.purchaseDate}', actualShelfLifeDays = ${req.body.actualShelfLifeDays} WHERE purchaseID = ${req.body.purchaseID};`;
    pool.query(query3, (error, row, fields) => {
        res.send();
    })
});

// Delete a Purchase by purchaseID
app.delete('/purchases/:_id', (req, res) => {
    let query4 = `DELETE FROM Purchases WHERE purchaseID = ${req.params._id};`;
    pool.query(query4, (error, row, fields) => {
        res.status(204).send();
    })
});

// Retrieve all IngredientSubstitutes, displaying ingredientName and substituteName
app.get('/ingredientSubstitutes', (req, res) => {
    let query1 = `SELECT ingredientSubstituteID, Ingredients.ingredientName AS ingredientName, Substitutes.ingredientName AS substituteName FROM IngredientSubstitutes
    JOIN Ingredients ON IngredientSubstitutes.ingredientID = Ingredients.ingredientID
    JOIN Ingredients AS Substitutes ON IngredientSubstitutes.substituteID = Substitutes.ingredientID ORDER BY ingredientName ASC;`;
    pool.query(query1, (error, rows, fields) => {
        res.send(rows);
    })
});

// Create an IngredientSubstitute
app.post('/ingredientSubstitutes', (req, res) => {
    let query2 = `INSERT INTO IngredientSubstitutes (ingredientID, substituteID) VALUES ((SELECT ingredientID FROM Ingredients WHERE ingredientName = '${req.body.ingredientName}'), (SELECT ingredientID FROM Ingredients WHERE ingredientName = '${req.body.substituteName}'));`;
    pool.query(query2, (error, row, fields) => {
        res.status(201).json(row);
    })
});

// Update an IngredientSubstitute by ingredientSubstituteID
app.put('/ingredientSubstitutes/:_id', (req, res) => {
    let query3 = `UPDATE IngredientSubstitutes SET ingredientID = (SELECT ingredientID FROM Ingredients WHERE ingredientName = '${req.body.ingredientName}'), substituteID = (SELECT ingredientID FROM Ingredients WHERE ingredientName = '${req.body.substituteName}') WHERE ingredientSubstituteID = ${req.body.ingredientSubstituteID};`;
    pool.query(query3, (error, row, fields) => {
        res.send();
    })
});

// Delete an IngredientSubstitute by ingredientSubstituteID
app.delete('/ingredientSubstitutes/:_id', (req, res) => {
    let query4 = `DELETE FROM IngredientSubstitutes WHERE ingredientSubstituteID = ${req.params._id};`;
    pool.query(query4, (error, row, fields) => {
        res.status(204).send();
    })
});

app.listen(PORT, () => {
    console.log(`supplier listening on port ${PORT}...`);
});
