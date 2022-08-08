import React from 'react';

function IngredientName({ ingredient }) {
    return (
        <option value={ingredient.ingredientName}>{ingredient.ingredientName}</option>
    );
}

export default IngredientName;