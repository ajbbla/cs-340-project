// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import OrderDish from './OrderDish';

function OrderDishList({ orderDishes, onDelete, onEdit }) {
    return (
        <table id="orderDishes">
            <thead>
                <tr>
                    <th>orderDishID</th>
                    <th>orderID</th>
                    <th>dishID</th>
                    <th>quantity</th>
                </tr>
            </thead>
            <tbody>
                {orderDishes.map((orderDish, i) => <OrderDish orderDish={orderDish} onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>
    );
}

export default OrderDishList;
