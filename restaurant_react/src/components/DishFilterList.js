// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import DishFilter from './DishFilter';

function DishFilterList({ dishesFilter }) {
    return (
        <table id="dishesFilter">
            <thead>
                <tr>
                    <th>dishID</th>
                    <th>dishName</th>
                    <th>price</th>
                    <th>spiceLevel</th>
                    <th>currentMenu</th>
                    <th>stockLevel</th>
                </tr>
            </thead>
            <tbody>
                {dishesFilter.map((dishFilter, i) => <DishFilter dishFilter={dishFilter} key={i} />)}
            </tbody>
        </table>
    );
}

export default DishFilterList;
