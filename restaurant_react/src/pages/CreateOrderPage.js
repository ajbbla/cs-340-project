import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function CreateOrderPage() {
    const [dateTime, setDateTime] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [serverID, setServerID] = useState('');

    const history = useHistory();

    const addOrder = async () => {
        const newOrder = { dateTime, totalPrice:Number(totalPrice), serverID:Number(serverID) };
        const response = await fetch('/orders', {
            method: 'POST',
            body: JSON.stringify(newOrder),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the order!");
        } else {
            alert(`Failed to add order, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Add Order</h1>
            <input
                type="text"
                placeholder="Enter dateTime here"
                value={dateTime}
                onChange={e => setDateTime(e.target.value)} />
            <input
                type="text"
                placeholder="Enter totalPrice here"
                value={totalPrice}
                onChange={e => setTotalPrice(e.target.value)} />
            <input
                type="text"
                placeholder="Enter serverID here"
                value={serverID}
                onChange={e => setServerID(e.target.value)} />
            <button
                onClick={addOrder}
            >Add</button>
        </div>
    );
}

export default CreateOrderPage;