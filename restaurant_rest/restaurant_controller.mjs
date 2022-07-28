import 'dotenv/config';
import * as r_model from './restaurant_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new order with the dateTime, totalPrice, serverID provided in the body
 * dateTime, totalPrice:Number(totalPrice), serverID:Number(serverID)
 */
app.post('/orders', (req, res) => {
    r_model.createOrder(req.body.dateTime, req.body.totalPrice, req.body.serverID)
        .then(order => {
            if(order !== null){
                res.status(201).json(order);
            } else {
                res.status(400).json({ Error: 'Invalid Request'})
            }
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an
            // error status code corresponding to the error.
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve all orders
 */
app.get('/orders', (req, res) => {
    //let filter = {};
    r_model.findOrders()
        .then(orders => {
            res.send(orders);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });
});

/**
 * Retrieve the order corresponding to the ID provided in the URL
 */
app.get('/orders/:_id', (req, res) => {
    const orderId = req.params._id;
    r_model.findOrderById(orderId)
        .then(order => { 
            if (order !== null) {
                res.json(order);
            } else {
                res.status(404).json({ Error: 'Not found' });
            }         
         })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Update the order whose id is provided in the path parameter and set
 * its dateTime, totalPrice, serverID to the values provided in the body.
 * dateTime, totalPrice:Number(totalPrice), serverID:Number(serverID)
 */
app.put('/orders/:_id', (req, res) => {
    const filter = {_id: req.params._id}
    const update = {dateTime: req.body.dateTime, totalPrice: req.body.totalPrice, serverID: req.body.serverID};
    r_model.replaceOrder(filter, update)
        .then(resultVal => {
            if (resultVal === null){
                res.status(400).json({ Error: 'Invalid Request'})
            } else if (resultVal.matchedCount == 0) {
                res.status(404).json({ Error: 'Not found' });
            } else {
                res.json({ _id: req.params._id, dateTime: req.body.dateTime, totalPrice: req.body.totalPrice, serverID: req.body.serverID })
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the order whose id is provided in the query parameters
 */
app.delete('/orders/:_id', (req, res) => {
    r_model.deleteOrderById({_id: req.params._id})
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Not Found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});