// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function OrderDish({ orderDish, onDelete, onEdit }) {
    return (
        <tr>
            <td>{orderDish.orderDishID}</td>
            <td>{orderDish.orderID}</td>
            <td>{orderDish.dishID}</td>
            <td>{orderDish.quantity}</td>
            <td><MdEdit onClick={() => onEdit(orderDish)} /></td>
            <td>< MdDeleteForever onClick={() => onDelete(orderDish.orderDishID)} /></td>
        </tr>
    );
}

export default OrderDish;