// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function CreateSupplierPage() {
    const [supplierName, setSupplierName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');

    const history = useHistory();

    const addSupplier = async () => {
        const newSupplier = { supplierName, city, state, streetAddress, contactName, contactPhone, contactEmail };
        const response = await fetch('/suppliers', {
            method: 'POST',
            body: JSON.stringify(newSupplier),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the supplier!");
        } else {
            alert(`Failed to add supplier, status code = ${response.status}`);
        }
        history.push("/view-suppliers");
    };

    return (
        <div>
            <h1>Add Supplier</h1>
            <input
                type="text"
                placeholder="Enter supplierName here"
                value={supplierName}
                onChange={e => setSupplierName(e.target.value)} />
            <input
                type="text"
                placeholder="Enter city here"
                value={city}
                onChange={e => setCity(e.target.value)} />
            <input
                type="text"
                placeholder="Enter state here"
                value={state}
                onChange={e => setState(e.target.value)} />
            <input
                type="text"
                placeholder="Enter streetAddress here"
                value={streetAddress}
                onChange={e => setStreetAddress(e.target.value)} />
            <input
                type="text"
                placeholder="Enter contactName here"
                value={contactName}
                onChange={e => setContactName(e.target.value)} />
            <input
                type="text"
                placeholder="Enter contactPhone here"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)} />
            <input
                type="text"
                placeholder="Enter contactEmail here"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)} />
            <button
                onClick={addSupplier}
            >Add</button>
        </div>
    );
}

export default CreateSupplierPage;
