// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import DishName from '../components/DishName';
import IngredientName from '../components/IngredientName';

function CreateDishIngredientPage({ dishes, ingredients }) {
    const [dishName, setDishName] = useState(1);
    const [ingredientName, setIngredientName] = useState('');
    const [gramQty, setGramQty] = useState('');
    const [isRaw, setIsRaw] = useState('');

    const history = useHistory();

    const addDishIngredient = async () => {
        const newDishIngredient = { dishName, ingredientName, gramQty:Number(gramQty), isRaw:Number(isRaw) };
        const response = await fetch('/dishIngredients', {
            method: 'POST',
            body: JSON.stringify(newDishIngredient),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the dishIngredient!");
        } else {
            alert(`Failed to add dishIngredient, status code = ${response.status}`);
        }
        history.push("/view-dishIngredients");
    };

    return (
        <div>
            <h1>Add DishIngredient</h1>
            <select name="dishName" onChange={e => setDishName(e.target.value)} value={dishName}>
                {dishes.map((dish, i) => <DishName dish={dish} key={i} />)}
            </select>
            <select name="ingredientName" onChange={e => setIngredientName(e.target.value)} value={ingredientName}>
                {ingredients.map((ingredient, i) => <IngredientName ingredient={ingredient} key={i} />)}
            </select>
            <input
                type="number"
                placeholder="Enter gramQty here"
                value={gramQty}
                onChange={e => setGramQty(e.target.value)} />
            <input
                type="number"
                placeholder="Enter isRaw here"
                value={isRaw}
                onChange={e => setIsRaw(e.target.value)} />
            <button
                onClick={addDishIngredient}
            >Add</button>
        </div>
    );
}

export default CreateDishIngredientPage;
