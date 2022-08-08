// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import ServerName from '../components/ServerName';

function EditOrderPage({ orderToEdit, servers }) {
    const [dateTime, setDateTime] = useState(orderToEdit.dateTime);
    const [totalPrice, setTotalPrice] = useState(orderToEdit.totalPrice);
    const [serverName, setServerName] = useState(orderToEdit.serverName);
    const [orderID, setOrderID] = useState(orderToEdit.orderID);

    const history = useHistory();

    const editOrder = async () => {
        const editedOrder = { dateTime, totalPrice:Number(totalPrice), serverName, orderID:Number(orderID) };
        const response = await fetch(`/orders/${orderToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedOrder),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert("Successfully edited the order!");
        } else {
            alert(`Failed to edit order, status code = ${response.status}`);
        }
        history.push("/view-orders");
    };

    return (
        <div>
            <h1>Edit Order</h1>
            <input
                type="datetime-local"
                value={dateTime}
                onChange={e => setDateTime(e.target.value)} />
            <input
                type="text"
                value={totalPrice}
                onChange={e => setTotalPrice(e.target.value)} />
            <select name="serverName" onChange={e => setServerName(e.target.value)} value={serverName}>
                {servers.map((server, i) => <ServerName server={server} key={i} />)}
            </select>
            <button
                onClick={editOrder}
            >Save</button>
        </div>
    );
}

export default EditOrderPage;
