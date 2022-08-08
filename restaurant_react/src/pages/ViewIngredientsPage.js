// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import IngredientList from '../components/IngredientList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function ViewIngredientsPage({ setIngredientToEdit, ingredients, setIngredients, loadIngredients }) {
    const history = useHistory();

    useEffect(() => {
        loadIngredients();
    }, []);

    const onDelete = async _id => {
        const response = await fetch(`/ingredients/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setIngredients(ingredients.filter(e => e._id !== _id));
            loadIngredients();
        } else {
            console.error(`Failed to delete ingredient with id = ${_id}, status code = ${response.status}`)
        } 
    }

    const onEdit = ingredient => {
        setIngredientToEdit(ingredient);
        history.push("/edit-ingredient");
    }

    return (
        <>
            <h2>List of Ingredients</h2>
            <IngredientList ingredients={ingredients} onDelete={onDelete} onEdit={onEdit}></IngredientList>
        </>
    );
}

export default ViewIngredientsPage;
