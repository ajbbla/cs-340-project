// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import Order from './Order';

function OrderList({ orders, onDelete, onEdit }) {
    return (
        <table id="orders">
            <thead>
                <tr>
                    <th>orderID</th>
                    <th>dateTime</th>
                    <th>totalPrice</th>
                    <th>serverID</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, i) => <Order order={order} onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>
    );
}

export default OrderList;
