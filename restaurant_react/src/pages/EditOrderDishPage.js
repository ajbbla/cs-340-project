// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import OrderID from '../components/OrderID';
import DishName from '../components/DishName';

function EditOrderDishPage({ orderDishToEdit, orders, dishes }) {
    const [orderDishID, setOrderDishID] = useState(orderDishToEdit.orderDishID);
    const [orderID, setOrderID] = useState(orderDishToEdit.orderID);
    const [quantity, setQuantity] = useState(orderDishToEdit.quantity);
    const [dishName, setDishName] = useState(orderDishToEdit.dishName)

    const history = useHistory();

    const editOrderDish = async () => {
        // const editedOrderDish = { orderDishID:Number(orderDishID), orderID:Number(orderID), dishID:Number(dishID), quantity:Number(quantity) };
        const editedOrderDish = { orderDishID:Number(orderDishID), orderID:Number(orderID), dishName, quantity:Number(quantity) };
        const response = await fetch(`/orderDishes/${orderDishToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedOrderDish),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert("Successfully edited the orderDish!");
        } else {
            alert(`Failed to edit orderDish, status code = ${response.status}`);
        }
        history.push("/view-orderDishes");
    };

    return (
        <div>
            <h1>Edit OrderDish</h1>
            <select name="orderID" onChange={e => setOrderID(e.target.value)} value={orderID}>
                {orders.map((order, i) => <OrderID orderID={orderID} order={order} key={i} />)}
            </select>
            <select name="dishName" onChange={e => setDishName(e.target.value)} value={dishName}>
                {dishes.map((dish, i) => <DishName dish={dish} key={i} />)}
            </select>
            <input
                type="text"
                value={quantity}
                onChange={e => setQuantity(e.target.value)} />
            <button
                onClick={editOrderDish}
            >Save</button>
        </div>
    );
}

export default EditOrderDishPage;
