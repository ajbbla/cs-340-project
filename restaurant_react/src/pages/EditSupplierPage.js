// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function EditSupplierPage({ supplierToEdit }) {
    const [supplierID, setSupplierID] = useState(supplierToEdit.supplierID);
    const [supplierName, setSupplierName] = useState(supplierToEdit.supplierName);
    const [city, setCity] = useState(supplierToEdit.city);
    const [state, setState] = useState(supplierToEdit.state);
    const [streetAddress, setStreetAddress] = useState(supplierToEdit.streetAddress);
    const [contactName, setContactName] = useState(supplierToEdit.contactName);
    const [contactPhone, setContactPhone] = useState(supplierToEdit.contactPhone);
    const [contactEmail, setContactEmail] = useState(supplierToEdit.contactEmail);

    const history = useHistory();

    const editSupplier = async () => {
        const editedSupplier = { supplierID, supplierName, city, state, streetAddress, contactName, contactPhone, contactEmail };       
        const response = await fetch(`/suppliers/${supplierToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedSupplier),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert("Successfully edited the supplier!");
        } else {
            alert(`Failed to edit supplier, status code = ${response.status}`);
        }
        history.push("/view-suppliers");
    };

    return (
        <div>
            <h1>Edit Supplier</h1>
            <input
                type="text"
                value={supplierName}
                onChange={e => setSupplierName(e.target.value)} />
            <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)} />
            <input
                type="text"
                value={state}
                onChange={e => setState(e.target.value)} />
            <input
                type="text"
                value={streetAddress}
                onChange={e => setStreetAddress(e.target.value)} />
            <input
                type="text"
                value={contactName}
                onChange={e => setContactName(e.target.value)} />
            <input
                type="text"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)} />
            <input
                type="text"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)} />
            <button
                onClick={editSupplier}
            >Save</button>
        </div>
    );
}

export default EditSupplierPage;
