// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function CreateOrderDishPage() {
    const [orderID, setOrderID] = useState('');
    const [dishID, setDishID] = useState('');
    const [quantity, setQuantity] = useState('');

    const history = useHistory();

    const addOrderDish = async () => {
        const newOrderDish = { orderID:Number(orderID), dishID:Number(dishID), quantity:Number(quantity) };
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
    };

    return (
        <div>
            <h1>Add OrderDish</h1>
            <input
                type="text"
                placeholder="Enter orderID here"
                value={orderID}
                onChange={e => setOrderID(e.target.value)} />
            <input
                type="text"
                placeholder="Enter dishID here"
                value={dishID}
                onChange={e => setDishID(e.target.value)} />
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
