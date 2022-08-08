// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';

function DishFilter({ dishFilter }) {
    return (
        <tr>
            <td>{dishFilter.dishID}</td>
            <td>{dishFilter.dishName}</td>
            <td>{dishFilter.price}</td>
            <td>{dishFilter.spiceLevel}</td>
            <td>{dishFilter.currentMenu}</td>
            <td>{dishFilter.stockLevel}</td>
        </tr>
    );
}

export default DishFilter;