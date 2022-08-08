// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import IngredientName from '../components/IngredientName';
import SubstituteName from '../components/SubstituteName';

function CreateIngredientSubstitutePage({ ingredients, substitutes }) {
    const [ingredientName, setIngredientName] = useState('');
    const [substituteName, setSubstituteName] = useState('');

    const history = useHistory();

    const addIngredientSubstitute = async () => {
        const newIngredientSubstitute = { ingredientName, substituteName };
        const response = await fetch('/ingredientSubstitutes', {
            method: 'POST',
            body: JSON.stringify(newIngredientSubstitute),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the ingredientSubstitute!");
        } else {
            alert(`Failed to add ingredientSubstitute, status code = ${response.status}`);
        }
        history.push("/view-ingredientSubstitutes");
    };

    return (
        <div>
            <h1>Add IngredientSubstitute</h1>
            <select name="ingredientName" onChange={e => setIngredientName(e.target.value)} value={ingredientName}>
                {ingredients.map((ingredient, i) => <IngredientName ingredient={ingredient} key={i} />)}
            </select>
            <select name="substituteName" onChange={e => setSubstituteName(e.target.value)} value={substituteName}>
                {substitutes.map((substitute, i) => <SubstituteName substitute={substitute} key={i} />)}
            </select>
            <button
                onClick={addIngredientSubstitute}
            >Add</button>
        </div>
    );
}

export default CreateIngredientSubstitutePage;
