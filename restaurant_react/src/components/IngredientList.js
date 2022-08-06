// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import Ingredient from './Ingredient';

function IngredientList({ ingredients, onDelete, onEdit }) {
    return (
        <table id="ingredients">
            <thead>
                <tr>
                    <th>ingredientID</th>
                    <th>ingredientName</th>
                    <th>color</th>
                    <th>plantFamily</th>
                    <th>foodGroup</th>
                    <th>avgShelfLifeDays</th>
                    <th>spiceLevel</th>
                    <th>currentIngredient</th>
                    <th>currentStockQty</th>
                </tr>
            </thead>
            <tbody>
                {ingredients.map((ingredient, i) => <Ingredient ingredient={ingredient} onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>
    );
}

export default IngredientList;
