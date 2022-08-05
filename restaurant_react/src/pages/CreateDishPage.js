// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function CreateDishPage() {
    const [dishName, setDishName] = useState('');
    const [price, setPrice] = useState('');
    const [spiceLevel, setSpiceLevel] = useState('');
    const [currentMenu, setCurrentMenu] = useState('');
    const [stockLevel, setStockLevel] = useState('');

    const history = useHistory();

    const addDish = async () => {
        const newDish = { dishName, price:Number(price), spiceLevel:Number(spiceLevel), currentMenu:Number(currentMenu), stockLevel };
        const response = await fetch('/dishes', {
            method: 'POST',
            body: JSON.stringify(newDish),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the dish!");
        } else {
            alert(`Failed to add dish, status code = ${response.status}`);
        }
        history.push("/view-dishes");
    };

    return (
        <div>
            <h1>Add Dish</h1>
            <input
                type="text"
                placeholder="Enter dishName here"
                value={dishName}
                onChange={e => setDishName(e.target.value)} />
            <input
                type="text"
                placeholder="Enter price here"
                value={price}
                onChange={e => setPrice(e.target.value)} />
            <input
                type="text"
                placeholder="Enter spiceLevel here"
                value={spiceLevel}
                onChange={e => setSpiceLevel(e.target.value)} />
            <input
                type="text"
                placeholder="Enter currentMenu here"
                value={currentMenu}
                onChange={e => setCurrentMenu(e.target.value)} />
            <input
                type="text"
                placeholder="Enter stockLevel here"
                value={stockLevel}
                onChange={e => setStockLevel(e.target.value)} />
            <button
                onClick={addDish}
            >Add</button>
        </div>
    );
}

export default CreateDishPage;
