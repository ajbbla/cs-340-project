// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import IngredientSubstitute from './IngredientSubstitute';

function IngredientSubstituteList({ ingredientSubstitutes, onDelete, onEdit }) {
    return (
        <table id="ingredientSubstitutes">
            <thead>
                <tr>
                    <th>ingredientSubstituteID</th>
                    <th>ingredientName</th>
                    <th>substituteName</th>
                </tr>
            </thead>
            <tbody>
                {ingredientSubstitutes.map((ingredientSubstitute, i) => <IngredientSubstitute ingredientSubstitute={ingredientSubstitute} onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>
    );
}

export default IngredientSubstituteList;
