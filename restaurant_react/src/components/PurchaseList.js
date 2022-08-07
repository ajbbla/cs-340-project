// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import Purchase from './Purchase';

function PurchaseList({ purchases, onDelete, onEdit }) {
    return (
        <table id="purchases">
            <thead>
                <tr>
                    <th>purchaseID</th>
                    <th>supplierID</th>
                    <th>ingredientID</th>
                    <th>costPerGram</th>
                    <th>gramQtyPurchased</th>
                    <th>purchaseDate</th>
                    <th>actualShelfLifeDays</th>
                </tr>
            </thead>
            <tbody>
                {purchases.map((purchase, i) => <Purchase purchase={purchase} onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>
    );
}

export default PurchaseList;
