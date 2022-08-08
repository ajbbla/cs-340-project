import React from 'react';

function IngredientID({ ingredientID, ingredient }) {
    return (
        <option value={ingredient.ingredientID}>{ingredient.ingredientID}</option>
    );
}

export default IngredientID;