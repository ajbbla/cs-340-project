import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const orderSchema = mongoose.Schema({
    dateTime: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    serverID: { type: Number, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Order = mongoose.model("Order", orderSchema);

/**
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

// validate the input parameters (from body of request) to createOrder()
function validRequest(dateTime, totalPrice, serverID) {
    if((isDateValid(dateTime) === true) && (typeof totalPrice === 'number' && totalPrice > 0) && (typeof serverID === 'number' && serverID > 0)){
        return true;
    } else {
        return false;
    }
}

// create an order
// validate request data
// req.body.dateTime, req.body.totalPrice, req.body.serverID
const createOrder = async (dateTime, totalPrice, serverID) => {
    if(validRequest(dateTime, totalPrice, serverID) === true){
        const order = new Order({dateTime: dateTime, totalPrice: totalPrice, serverID: serverID});
        return order.save();
    } else {
        return null;
    }
}

// find all order
const findOrders = async () => {
    const query = Order.find({});
    return query.exec();
}

// find an order by id
const findOrderById = async (filter) => {
    const query = Order.findById(filter);
    return query.exec();
}

// update an order by replacing it
// validate request data
const replaceOrder = async (filter, update) => {
    const { dateTime, totalPrice, serverID } = update;
    if(validRequest(dateTime, totalPrice, serverID) === true){
        const result = await Order.updateOne(filter, update);
        return result;
    } else {
        return null;
    }
}

// delete an order by id
const deleteOrderById = async (filter) => {
    const result = await Order.deleteOne(filter);
    return result.deletedCount;
}

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export { createOrder, findOrders, findOrderById, replaceOrder, deleteOrderById };