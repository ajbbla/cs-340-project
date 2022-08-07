// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import DishList from '../components/DishList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function ViewDishesPage({ setDishToEdit, dishes, setDishes, loadDishes }) {
    // const [dishes, setDishes] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/dishes/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setDishes(dishes.filter(e => e._id !== _id));
            loadDishes();
        } else {
            console.error(`Failed to delete dish with id = ${_id}, status code = ${response.status}`)
        } 
    }

    const onEdit = dish => {
        setDishToEdit(dish);
        history.push("/edit-dish");
    }

    return (
        <>
            <h2>List of Dishes</h2>
            <DishList dishes={dishes} onDelete={onDelete} onEdit={onEdit}></DishList>
        </>
    );
}

export default ViewDishesPage;
