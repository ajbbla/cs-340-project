// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function DishIngredient({ dishIngredient, onDelete, onEdit }) {
    return (
        <tr>
            <td>{dishIngredient.dishIngredientID}</td>
            <td>{dishIngredient.dishName}</td>
            <td>{dishIngredient.ingredientName}</td>
            <td>{dishIngredient.gramQty}</td>
            <td>{dishIngredient.isRaw}</td>
            <td><MdEdit onClick={() => onEdit(dishIngredient)} /></td>
            <td>< MdDeleteForever onClick={() => onDelete(dishIngredient.dishIngredientID)} /></td>
        </tr>
    );
}

export default DishIngredient;