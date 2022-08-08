// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import IngredientSubstituteList from '../components/IngredientSubstituteList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function ViewIngredientSubstitutesPage({ setIngredientSubstituteToEdit }) {
    const [ingredientSubstitutes, setIngredientSubstitutes] = useState([]);
    const history = useHistory();

    const loadIngredientSubstitutes = async () => {
        const response = await fetch('/ingredientSubstitutes');
        const ingredientSubstitutes = await response.json();
        setIngredientSubstitutes(ingredientSubstitutes);
    }

    useEffect(() => {
        loadIngredientSubstitutes();
    }, []);

    const onDelete = async _id => {
        const response = await fetch(`/ingredientSubstitutes/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setIngredientSubstitutes(ingredientSubstitutes.filter(e => e._id !== _id));
            loadIngredientSubstitutes();
        } else {
            console.error(`Failed to delete ingredientSubstitute with id = ${_id}, status code = ${response.status}`)
        } 
    }

    const onEdit = ingredientSubstitute => {
        setIngredientSubstituteToEdit(ingredientSubstitute);
        history.push("/edit-ingredientSubstitute");
    }

    return (
        <>
            <h2>List of IngredientSubstitutes</h2>
            <IngredientSubstituteList ingredientSubstitutes={ingredientSubstitutes} onDelete={onDelete} onEdit={onEdit}></IngredientSubstituteList>
        </>
    );
}

export default ViewIngredientSubstitutesPage;
