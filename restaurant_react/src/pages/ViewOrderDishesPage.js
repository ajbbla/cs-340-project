// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import OrderDishList from '../components/OrderDishList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ViewOrderDishesPage({ setOrderDishToEdit }) {
    const [orderDishes, setOrderDishes] = useState([]);
    const history = useHistory();

    const loadOrderDishes = async () => {
        const response = await fetch('/orderDishes');
        const orderDishes = await response.json();
        setOrderDishes(orderDishes);
    }

    useEffect(() => {
        loadOrderDishes();
    }, []);

    const onDelete = async _id => {
        const response = await fetch(`/orderDishes/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setOrderDishes(orderDishes.filter(e => e._id !== _id));
            loadOrderDishes();
        } else {
            console.error(`Failed to delete orderDish with id = ${_id}, status code = ${response.status}`)
        } 
    }

    const onEdit = orderDish => {
        setOrderDishToEdit(orderDish);
        history.push("/edit-orderDish");
    }

    return (
        <>
            <Link to="/add-orderDish">Go to Create OrderDish Page</Link>
            <br></br>
            <h2>List of OrderDishes</h2>
            <OrderDishList orderDishes={orderDishes} onDelete={onDelete} onEdit={onEdit}></OrderDishList>
        </>
    );
}

export default ViewOrderDishesPage;
