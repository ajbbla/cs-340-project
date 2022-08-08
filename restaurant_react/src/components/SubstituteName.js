import React from 'react';

function SubstituteName({ substitute }) {
    return (
        <option value={substitute.ingredientName}>{substitute.ingredientName}</option>
    );
}

export default SubstituteName;