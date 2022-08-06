// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function EditIngredientPage({ ingredientToEdit }) {
    const [ingredientID, setIngredientID] = useState(ingredientToEdit.ingredientID);
    const [ingredientName, setIngredientName] = useState('');
    const [color, setColor] = useState('');
    const [plantFamily, setPlantFamily] = useState('');
    const [foodGroup, setFoodGroup] = useState('');
    const [avgShelfLifeDays, setAvgShelfLifeDays] = useState('');
    const [spiceLevel, setSpiceLevel] = useState('');
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [currentStockQty, setCurrentStockQty] = useState('');

    const history = useHistory();

    const editIngredient = async () => {
        const editedIngredient = { ingredientName, color, plantFamily, foodGroup, avgShelfLifeDays:Number(avgShelfLifeDays), spiceLevel:Number(spiceLevel), currentIngredient:Number(currentIngredient), currentStockQty:Number(currentStockQty), ingredientID:Number(ingredientID) };
        const response = await fetch(`/ingredients/${ingredientToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedIngredient),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert("Successfully edited the ingredient!");
        } else {
            alert(`Failed to edit ingredient, status code = ${response.status}`);
        }
        history.push("/view-ingredients");
    };

    return (
        <div>
            <h1>Edit Ingredient</h1>
            <input
                type="text"
                placeholder="Enter ingredientName here"
                value={ingredientName}
                onChange={e => setIngredientName(e.target.value)} />
            <input
                type="text"
                placeholder="Enter color here"
                value={color}
                onChange={e => setColor(e.target.value)} />
            <input
                type="text"
                placeholder="Enter plantFamily here"
                value={plantFamily}
                onChange={e => setPlantFamily(e.target.value)} />
            <input
                type="text"
                placeholder="Enter foodGroup here"
                value={foodGroup}
                onChange={e => setFoodGroup(e.target.value)} />
            <input
                type="number"
                placeholder="Enter avgShelfLifeDays here"
                value={avgShelfLifeDays}
                onChange={e => setAvgShelfLifeDays(e.target.value)} />
            <input
                type="number"
                placeholder="Enter spiceLevel here"
                value={spiceLevel}
                onChange={e => setSpiceLevel(e.target.value)} />
            <input
                type="number"
                placeholder="Enter currentIngredient here"
                value={currentIngredient}
                onChange={e => setCurrentIngredient(e.target.value)} />
            <input
                type="number"
                placeholder="Enter currentStockQty here"
                value={currentStockQty}
                onChange={e => setCurrentStockQty(e.target.value)} />
            <button
                onClick={editIngredient}
            >Save</button>
        </div>
    );
}

export default EditIngredientPage;
