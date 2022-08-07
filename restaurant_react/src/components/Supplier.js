// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Supplier({ supplier, onDelete, onEdit }) {
    return (
        <tr>
            <td>{supplier.supplierID}</td>
            <td>{supplier.supplierName}</td>
            <td>{supplier.city}</td>
            <td>{supplier.state}</td>
            <td>{supplier.streetAddress}</td>
            <td>{supplier.contactName}</td>
            <td>{supplier.contactPhone}</td>
            <td>{supplier.contactEmail}</td>
            <td><MdEdit onClick={() => onEdit(supplier)} /></td>
            <td>< MdDeleteForever onClick={() => onDelete(supplier.supplierID)} /></td>
        </tr>
    );
}

export default Supplier;