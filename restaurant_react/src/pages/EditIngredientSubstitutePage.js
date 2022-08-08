// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import IngredientName from '../components/IngredientName';
import SubstituteName from '../components/SubstituteName';

function EditIngredientSubstitutePage({ ingredientSubstituteToEdit, ingredients, substitutes }) {
    const [ingredientSubstituteID, setIngredientSubstituteID] = useState(ingredientSubstituteToEdit.ingredientSubstituteID);
    const [ingredientName, setIngredientName] = useState('');
    const [substituteName, setSubstituteName] = useState('');

    const history = useHistory();

    const editIngredientSubstitute = async () => {
        const editedIngredientSubstitute = { ingredientSubstituteID:Number(ingredientSubstituteID), ingredientName, substituteName};
        const response = await fetch(`/ingredientSubstitutes/${ingredientSubstituteToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedIngredientSubstitute),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert("Successfully edited the ingredientSubstitute!");
        } else {
            alert(`Failed to edit ingredientSubstitute, status code = ${response.status}`);
        }
        history.push("/view-ingredientSubstitutes");
    };

    return (
        <div>
            <h1>Edit IngredientSubstitute</h1>
            <select name="ingredientName" onChange={e => setIngredientName(e.target.value)} value={ingredientName}>
                {ingredients.map((ingredient, i) => <IngredientName ingredient={ingredient} key={i} />)}
            </select>
            <select name="substituteName" onChange={e => setSubstituteName(e.target.value)} value={substituteName}>
                {substitutes.map((substitute, i) => <SubstituteName substitute={substitute} key={i} />)}
            </select>
            <button
                onClick={editIngredientSubstitute}
            >Save</button>
        </div>
    );
}

export default EditIngredientSubstitutePage;
