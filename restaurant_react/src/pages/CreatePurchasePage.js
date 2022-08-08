// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import SupplierName from '../components/SupplierName';
import IngredientName from '../components/IngredientName';

function CreatePurchasePage({ suppliers, ingredients }) {
    const [supplierName, setSupplierName] = useState('');
    const [ingredientName, setIngredientName] = useState('');
    const [costPerGram, setCostPerGram] = useState('');
    const [gramQtyPurchased, setGramQtyPurchased] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [actualShelfLifeDays, setActualShelfLifeDays] = useState('');

    const history = useHistory();

    const addPurchase = async () => {
        const newPurchase = { supplierName, ingredientName, costPerGram:Number(costPerGram), gramQtyPurchased:Number(gramQtyPurchased), purchaseDate, actualShelfLifeDays:Number(actualShelfLifeDays) };
        const response = await fetch('/purchases', {
            method: 'POST',
            body: JSON.stringify(newPurchase),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the purchase!");
        } else {
            alert(`Failed to add purchase, status code = ${response.status}`);
        }
        history.push("/view-purchases");
    };

    return (
        <div>
            <h1>Add Purchase</h1>
            <select name="supplierName" onChange={e => setSupplierName(e.target.value)} value={supplierName}>
                {suppliers.map((supplier, i) => <SupplierName supplier={supplier} key={i} />)}
            </select>
            <select name="ingredientName" onChange={e => setIngredientName(e.target.value)} value={ingredientName}>
                {ingredients.map((ingredient, i) => <IngredientName ingredient={ingredient} key={i} />)}
            </select>
            <input
                type="number"
                placeholder="Enter costPerGram here"
                value={costPerGram}
                onChange={e => setCostPerGram(e.target.value)} />
            <input
                type="number"
                placeholder="Enter gramQtyPurchased here"
                value={gramQtyPurchased}
                onChange={e => setGramQtyPurchased(e.target.value)} />
            <input
                type="date"
                placeholder="Enter purchaseDate here"
                value={purchaseDate}
                onChange={e => setPurchaseDate(e.target.value)} />
            <input
                type="number"
                placeholder="Enter actualShelfLifeDays here"
                value={actualShelfLifeDays}
                onChange={e => setActualShelfLifeDays(e.target.value)} />
            <button
                onClick={addPurchase}
            >Add</button>
        </div>
    );
}

export default CreatePurchasePage;
