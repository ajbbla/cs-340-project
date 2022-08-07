import React from 'react';

function DishID({ dishID, dish }) {
    return (
        <option value={dish.dishID}>{dish.dishID}</option>
    );
}

export default DishID;