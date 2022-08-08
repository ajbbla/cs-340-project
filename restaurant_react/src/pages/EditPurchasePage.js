// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import SupplierName from '../components/SupplierName';
import IngredientName from '../components/IngredientName';

function EditPurchasePage({ purchaseToEdit, suppliers, ingredients }) {
    const [purchaseID, setPurchaseID] = useState(purchaseToEdit.purchaseID);
    const [costPerGram, setCostPerGram] = useState(purchaseToEdit.costPerGram);
    const [gramQtyPurchased, setGramQtyPurchased] = useState(purchaseToEdit.gramQtyPurchased);
    const [purchaseDate, setPurchaseDate] = useState(purchaseToEdit.purchaseDate);
    const [actualShelfLifeDays, setActualShelfLifeDays] = useState(purchaseToEdit.actualShelfLifeDays);

    const [supplierName, setSupplierName] = useState('');
    const [ingredientName, setIngredientName] = useState('')

    const history = useHistory();

    const editPurchase = async () => {
        const editedPurchase = { purchaseID:Number(purchaseID), supplierName, ingredientName, costPerGram:Number(costPerGram), gramQtyPurchased:Number(gramQtyPurchased), purchaseDate, actualShelfLifeDays:Number(actualShelfLifeDays) };
        const response = await fetch(`/purchases/${purchaseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedPurchase),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert("Successfully edited the purchase!");
        } else {
            alert(`Failed to edit purchase, status code = ${response.status}`);
        }
        history.push("/view-purchases");
    };

    return (
        <div>
            <h1>Edit Purchase</h1>
            <select name="supplierName" onChange={e => setSupplierName(e.target.value)} value={supplierName}>
                {suppliers.map((supplier, i) => <SupplierName supplierName={supplierName} supplier={supplier} key={i} />)}
            </select>
            <select name="ingredientName" onChange={e => setIngredientName(e.target.value)} value={ingredientName}>
                {ingredients.map((ingredient, i) => <IngredientName ingredient={ingredient} key={i} />)}
            </select>
            <input
                type="number"
                value={costPerGram}
                onChange={e => setCostPerGram(e.target.value)} />
            <input
                type="number"
                value={gramQtyPurchased}
                onChange={e => setGramQtyPurchased(e.target.value)} />
            <input
                type="date"
                value={purchaseDate}
                onChange={e => setPurchaseDate(e.target.value)} />
            <input
                type="number"
                value={actualShelfLifeDays}
                onChange={e => setActualShelfLifeDays(e.target.value)} />
            <button
                onClick={editPurchase}
            >Save</button>
        </div>
    );
}

export default EditPurchasePage;
