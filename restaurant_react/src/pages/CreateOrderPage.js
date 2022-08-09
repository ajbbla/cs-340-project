// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import ServerName from '../components/ServerName';
import DishName from '../components/DishName';

let orderDishes = {}

function CreateOrderPage({ servers, dishes, addOrderDish, loadOrders, orders }) {
    const [dateTime, setDateTime] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [serverName, setServerName] = useState(servers.serverName);
    const [orderID, setOrderID] = useState('');
    const [dishName, setDishName] = useState('');
    const [quantity, setQuantity] = useState('');

    const history = useHistory();

    const addOrder = async () => {
        const newOrder = { dateTime, totalPrice:Number(totalPrice), serverName };
        const response = await fetch('/orders', {
            method: 'POST',
            body: JSON.stringify(newOrder),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the order!");
        } else {
            alert(`Failed to add order, status code = ${response.status}`);
        }

        await sendOrderDish();
    };

    const sendOrderDish = async () => {
        const response = await fetch('/newOrderID');
        const newOrderID = await response.json();
        // console.log('>>>newOrderID: ', newOrderID);
        let thisOrderID = newOrderID[0].newOrderID
        // console.log('>>>thisOrderID: ', thisOrderID);

        for (let dish in orderDishes) {
            // console.log('>>>dish: ', dish);
            let dishQuantity = orderDishes[`${dish}`];
            // console.log('>>>dishQuantity: ', dishQuantity);
            addOrderDish(thisOrderID, dish, dishQuantity, history);
        }

        orderDishes = {}

        history.push("/view-orders");
    };

    const addDishToOrder = async () => {
        let quantity_num = Number(quantity)
        if (dishName in orderDishes) {
            orderDishes[`${dishName}`] += quantity_num;
        } else {
            orderDishes[`${dishName}`] = quantity_num;
        }
        console.log('>>>orderDishes: ', orderDishes);
    };

    return (
        <>
            <div>
                <h1>Add Order</h1>
                <h2>Add Dishes to the Order</h2>
                <select name="dishName" onChange={e => setDishName(e.target.value)} value={dishName}>
                    <option value={null}>-Select-</option>
                    {dishes.map((dish, i) => <DishName dish={dish} key={i} />)}
                </select>
                <input
                    type="number"
                    placeholder="Enter quantity of this dish here"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)} />
                <button
                    onClick={addDishToOrder}
                >Add Dish to Order</button>
            </div>
            <div>
            <h2>Add Order Details</h2>
                <input
                    type="text"
                    placeholder="Enter dateTime here"
                    value={dateTime}
                    onChange={e => setDateTime(e.target.value)} />
                <input
                    type="text"
                    placeholder="Enter totalPrice here"
                    value={totalPrice}
                    onChange={e => setTotalPrice(e.target.value)} />
                <select name="serverName" onChange={e => setServerName(e.target.value)} value={serverName}>
                    <option value={'NULL'}>None</option>
                    {servers.map((server, i) => <ServerName server={server} key={i} />)}
                </select>
                <button
                    onClick={addOrder}
                >Add Order</button>
            </div>
        </>
    );
}

export default CreateOrderPage;
