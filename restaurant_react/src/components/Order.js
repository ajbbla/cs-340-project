// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Order({ order, onDelete, onEdit }) {
    return (
        <tr>
            <td>{order.orderID}</td>
            <td>{order.dateTime}</td>
            <td>{order.totalPrice}</td>
            <td>{order.serverID}</td>
            <td><MdEdit onClick={() => onEdit(order)} /></td>
            <td>< MdDeleteForever onClick={() => onDelete(order.orderID)} /></td>
        </tr>
    );
}

export default Order;