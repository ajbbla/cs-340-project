// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import DishIngredient from './DishIngredient';

function DishIngredientList({ dishIngredients, onDelete, onEdit }) {
    return (
        <table id="dishIngredients">
            <thead>
                <tr>
                    <th>dishIngredientID</th>
                    <th>dishName</th>
                    <th>ingredientName</th>
                    <th>gramQty</th>
                    <th>isRaw</th>
                </tr>
            </thead>
            <tbody>
                {dishIngredients.map((dishIngredient, i) => <DishIngredient dishIngredient={dishIngredient} onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>
    );
}

export default DishIngredientList;
