// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import OrderList from '../components/OrderList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ViewOrdersPage({ setOrderToEdit, orders, setOrders, loadOrders }) {
    const history = useHistory();

    useEffect(() => {
        loadOrders();
    }, []);

    const onDelete = async _id => {
        const response = await fetch(`/orders/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setOrders(orders.filter(e => e._id !== _id));
            loadOrders();
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
            <Link to="/add-order">Go to Create Order Page</Link>
            <br></br>
            <h2>List of Orders</h2>
            <OrderList orders={orders} onDelete={onDelete} onEdit={onEdit}></OrderList>
        </>
    );
}

export default ViewOrdersPage;
