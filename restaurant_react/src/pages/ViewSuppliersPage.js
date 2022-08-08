// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import SupplierList from '../components/SupplierList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function ViewSuppliersPage({ setSupplierToEdit, suppliers, setSuppliers, loadSuppliers }) {
    const history = useHistory();

    useEffect(() => {
        loadSuppliers();
    }, []);

    const onDelete = async _id => {
        const response = await fetch(`/suppliers/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setSuppliers(suppliers.filter(e => e._id !== _id));
            loadSuppliers();
        } else {
            console.error(`Failed to delete supplier with id = ${_id}, status code = ${response.status}`)
        } 
    }

    const onEdit = supplier => {
        setSupplierToEdit(supplier);
        history.push("/edit-supplier");
    }

    return (
        <>
            <h2>List of Suppliers</h2>
            <SupplierList suppliers={suppliers} onDelete={onDelete} onEdit={onEdit}></SupplierList>
        </>
    );
}

export default ViewSuppliersPage;
