// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import DishIngredientList from '../components/DishIngredientList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ViewDishIngredientsPage({ setDishIngredientToEdit }) {
    const [dishIngredients, setDishIngredients] = useState([]);
    const history = useHistory();

    const loadDishIngredients = async () => {
        const response = await fetch('/dishIngredients');
        const dishIngredients = await response.json();
        setDishIngredients(dishIngredients);
    }

    useEffect(() => {
        loadDishIngredients();
    }, []);

    const onDelete = async _id => {
        const response = await fetch(`/dishIngredients/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setDishIngredients(dishIngredients.filter(e => e._id !== _id));
            loadDishIngredients();
        } else {
            console.error(`Failed to delete dishIngredient with id = ${_id}, status code = ${response.status}`)
        } 
    }

    const onEdit = dishIngredient => {
        setDishIngredientToEdit(dishIngredient);
        history.push("/edit-dishIngredient");
    }

    return (
        <>
            <Link to="/add-dishIngredient">Go to Create DishIngredient Page</Link>
            <br></br>
            <h2>List of DishIngredients</h2>
            <DishIngredientList dishIngredients={dishIngredients} onDelete={onDelete} onEdit={onEdit}></DishIngredientList>
        </>
    );
}

export default ViewDishIngredientsPage;
