// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import ServerName from '../components/ServerName';

function CreateOrderPage({ servers }) {
    const [dateTime, setDateTime] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [serverName, setServerName] = useState(servers.serverName);

    const history = useHistory();

    const addOrder = async () => {
        const newOrder = { dateTime, totalPrice:Number(totalPrice), serverName };
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
        history.push("/view-orders");
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
            <select name="serverName" onChange={e => setServerName(e.target.value)} value={serverName}>
                <option >-Select Server-</option>
                <option value={'NULL'}>None</option>
                {servers.map((server, i) => <ServerName server={server} key={i} />)}
            </select>
            <button
                onClick={addOrder}
            >Add</button>
        </div>
    );
}

export default CreateOrderPage;
