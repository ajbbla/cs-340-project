// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import OrderID from '../components/OrderID';
import DishName from '../components/DishName';

function CreateOrderDishPage({ orders, dishes }) {
    const [orderID, setOrderID] = useState('');
    const [dishName, setDishName] = useState('');
    const [quantity, setQuantity] = useState('');

    const history = useHistory();

    const addOrderDish = async () => {
        if (!orderID || !dishName) {
            alert("Please select both an orderID and a dishName");
        } else {
            const newOrderDish = { orderID:Number(orderID), dishName, quantity:Number(quantity) };
            const response = await fetch('/orderDishes', {
                method: 'POST',
                body: JSON.stringify(newOrderDish),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(response.status === 201){
                alert("Successfully added the orderDish!");
            } else {
                alert(`Failed to add orderDish, status code = ${response.status}`);
            }
            history.push("/view-orderDishes");
        }
    };

    return (
        <div>
            <h1>Add OrderDish</h1>
            <select name="orderID" onChange={e => setOrderID(e.target.value)} value={orderID}>
                <option value={null}>-Select-</option>
                {orders.map((order, i) => <OrderID order={order} key={i} />)}
            </select>
            <select name="dishName" onChange={e => setDishName(e.target.value)} value={dishName}>
                <option value={null}>-Select-</option>
                {dishes.map((dish, i) => <DishName dish={dish} key={i} />)}
            </select>
            <input
                type="text"
                placeholder="Enter quantity here"
                value={quantity}
                onChange={e => setQuantity(e.target.value)} />
            <button
                onClick={addOrderDish}
            >Add</button>
        </div>
    );
}

export default CreateOrderDishPage;
