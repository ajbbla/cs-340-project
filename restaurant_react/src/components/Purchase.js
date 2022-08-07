// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Purchase({ purchase, onDelete, onEdit }) {
    return (
        <tr>
            <td>{purchase.purchaseID}</td>
            <td>{purchase.supplierID}</td>
            <td>{purchase.ingredientID}</td>
            <td>{purchase.costPerGram}</td>
            <td>{purchase.gramQtyPurchased}</td>
            <td>{purchase.purchaseDate}</td>
            <td>{purchase.actualShelfLifeDays}</td>
            <td><MdEdit onClick={() => onEdit(purchase)} /></td>
            <td>< MdDeleteForever onClick={() => onDelete(purchase.purchaseID)} /></td>
        </tr>
    );
}

export default Purchase;