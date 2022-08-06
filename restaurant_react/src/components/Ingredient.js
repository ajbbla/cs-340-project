// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Ingredient({ ingredient, onDelete, onEdit }) {
    return (
        <tr>
            <td>{ingredient.ingredientID}</td>
            <td>{ingredient.ingredientName}</td>
            <td>{ingredient.color}</td>
            <td>{ingredient.plantFamily}</td>
            <td>{ingredient.foodGroup}</td>
            <td>{ingredient.avgShelfLifeDays}</td>
            <td>{ingredient.spiceLevel}</td>
            <td>{ingredient.currentIngredient}</td>
            <td>{ingredient.currentStockQty}</td>
            <td><MdEdit onClick={() => onEdit(ingredient)} /></td>
            <td>< MdDeleteForever onClick={() => onDelete(ingredient.ingredientID)} /></td>
        </tr>
    );
}

export default Ingredient;