// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function EditDishPage({ dishToEdit }) {
    const [dishID, setDishID] = useState(dishToEdit.dishID);
    const [dishName, setDishName] = useState(dishToEdit.dishName);
    const [price, setPrice] = useState(dishToEdit.price);
    const [spiceLevel, setSpiceLevel] = useState(dishToEdit.spiceLevel);
    const [currentMenu, setCurrentMenu] = useState(dishToEdit.currentMenu);
    const [stockLevel, setStockLevel] = useState(dishToEdit.stockLevel);

    const history = useHistory();

    const editDish = async () => {
        const editedDish = { dishID:Number(dishID), dishName, price:Number(price), spiceLevel:Number(spiceLevel), currentMenu:Number(currentMenu), stockLevel };       
        const response = await fetch(`/dishes/${dishToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedDish),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert("Successfully edited the dish!");
        } else {
            alert(`Failed to edit dish, status code = ${response.status}`);
        }
        history.push("/view-dishes");
    };

    return (
        <div>
            <h1>Edit Dish</h1>
            <input
                type="text"
                value={dishName}
                onChange={e => setDishName(e.target.value)} />
            <input
                type="text"
                value={price}
                onChange={e => setPrice(e.target.value)} />
            <input
                type="text"
                value={spiceLevel}
                onChange={e => setSpiceLevel(e.target.value)} />
            <input
                type="text"
                value={currentMenu}
                onChange={e => setCurrentMenu(e.target.value)} />
            <input
                type="text"
                value={stockLevel}
                onChange={e => setStockLevel(e.target.value)} />
            <button
                onClick={editDish}
            >Save</button>
        </div>
    );
}

export default EditDishPage;
