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
            <td>< MdDeleteForever onClick={() => onDelete(order._id)} /></td>
        </tr>
    );
}

export default Order;