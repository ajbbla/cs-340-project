// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import PurchaseList from '../components/PurchaseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function ViewPurchasesPage({ setPurchaseToEdit }) {
    const [purchases, setPurchases] = useState([]);
    const history = useHistory();

    const loadPurchases = async () => {
        const response = await fetch('/purchases');
        const purchases = await response.json();
        setPurchases(purchases);
    }

    useEffect(() => {
        loadPurchases();
    }, []);

    const onDelete = async _id => {
        const response = await fetch(`/purchases/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setPurchases(purchases.filter(e => e._id !== _id));
            loadPurchases();
        } else {
            console.error(`Failed to delete purchase with id = ${_id}, status code = ${response.status}`)
        } 
    }

    const onEdit = purchase => {
        setPurchaseToEdit(purchase);
        history.push("/edit-purchase");
    }

    return (
        <>
            <h2>List of Purchases</h2>
            <PurchaseList purchases={purchases} onDelete={onDelete} onEdit={onEdit}></PurchaseList>
        </>
    );
}

export default ViewPurchasesPage;
