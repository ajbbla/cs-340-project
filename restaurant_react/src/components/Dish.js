// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Dish({ dish, onDelete, onEdit }) {
    return (
        <tr>
            <td>{dish.dishID}</td>
            <td>{dish.dishName}</td>
            <td>{dish.price}</td>
            <td>{dish.spiceLevel}</td>
            <td>{dish.currentMenu}</td>
            <td>{dish.stockLevel}</td>
            <td><MdEdit onClick={() => onEdit(dish)} /></td>
            <td>< MdDeleteForever onClick={() => onDelete(dish.dishID)} /></td>
        </tr>
    );
}

export default Dish;