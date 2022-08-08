// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function IngredientSubstitute({ ingredientSubstitute, onDelete, onEdit }) {
    return (
        <tr>
            <td>{ingredientSubstitute.ingredientSubstituteID}</td>
            <td>{ingredientSubstitute.ingredientName}</td>
            <td>{ingredientSubstitute.substituteName}</td>
            <td><MdEdit onClick={() => onEdit(ingredientSubstitute)} /></td>
            <td>< MdDeleteForever onClick={() => onDelete(ingredientSubstitute.ingredientSubstituteID)} /></td>
        </tr>
    );
}

export default IngredientSubstitute;