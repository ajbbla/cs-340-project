// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import DishName from '../components/DishName';
import IngredientName from '../components/IngredientName';

function EditDishIngredientPage({ dishIngredientToEdit, dishes, ingredients }) {
    const [dishName, setDishName] = useState(dishIngredientToEdit.dishName);
    const [ingredientName, setIngredientName] = useState(dishIngredientToEdit.ingredientName);
    const [gramQty, setGramQty] = useState(dishIngredientToEdit.gramQty);
    const [isRaw, setIsRaw] = useState(dishIngredientToEdit.isRaw);
    const [dishIngredientID, setDishIngredientID] = useState(dishIngredientToEdit.dishIngredientID);

    const history = useHistory();

    const editDishIngredient = async () => {
        const editedDishIngredient = { dishIngredientID:Number(dishIngredientID), dishName, ingredientName, gramQty:Number(gramQty), isRaw:Number(isRaw) };
        const response = await fetch(`/dishIngredients/${dishIngredientToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedDishIngredient),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert("Successfully edited the dishIngredient!");
        } else {
            alert(`Failed to edit dishIngredient, status code = ${response.status}`);
        }
        history.push("/view-dishIngredients");
    };

    return (
        <div>
            <h1>Edit DishIngredient</h1>
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
                onClick={editDishIngredient}
            >Save</button>
        </div>
    );
}

export default EditDishIngredientPage;
