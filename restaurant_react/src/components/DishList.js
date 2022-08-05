// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import Dish from './Dish';

function DishList({ dishes, onDelete, onEdit }) {
    return (
        <table id="dishes">
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
                {dishes.map((dish, i) => <Dish dish={dish} onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>
    );
}

export default DishList;
