// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import Supplier from './Supplier';

function SupplierList({ suppliers, onDelete, onEdit }) {
    return (
        <table id="suppliers">
            <thead>
                <tr>
                    <th>supplierID</th>
                    <th>supplierName</th>
                    <th>city</th>
                    <th>state</th>
                    <th>streetAddress</th>
                    <th>contactName</th>
                    <th>contactPhone</th>
                    <th>contactEmail</th>
                </tr>
            </thead>
            <tbody>
                {suppliers.map((supplier, i) => <Supplier supplier={supplier} onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>
    );
}

export default SupplierList;
