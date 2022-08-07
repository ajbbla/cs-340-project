import React from 'react';

function DishName({ dish }) {
    return (
        <option value={dish.dishName}>{dish.dishName}</option>
    );
}

export default DishName;