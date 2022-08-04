// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import OrderList from '../components/OrderList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setOrderToEdit }) {
    const [orders, setOrders] = useState([]);
    const history = useHistory();

    const loadOrders = async () => {
        const response = await fetch('/orders');
        const orders = await response.json();
        // console.log(orders);
        setOrders(orders);
    }

    useEffect(() => {
        loadOrders();
    });

    const onDelete = async _id => {
        const response = await fetch(`/orders/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setOrders(orders.filter(e => e._id !== _id));
        } else {
        console.error(`Failed to delete order with id = ${_id}, status code = ${response.status}`)
        }
    }

    const onEdit = order => {
        setOrderToEdit(order);
        history.push("/edit-order");
    }

    return (
        <>
            <h2>List of Orders</h2>
            <OrderList orders={orders} onDelete={onDelete} onEdit={onEdit}></OrderList>
        </>
    );
}

export default HomePage;