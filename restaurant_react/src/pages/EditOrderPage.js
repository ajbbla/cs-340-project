import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function EditOrderPage({ orderToEdit }) {
    const [dateTime, setDateTime] = useState(orderToEdit.dateTime);
    const [totalPrice, setTotalPrice] = useState(orderToEdit.totalPrice);
    const [serverID, setServerID] = useState(orderToEdit.serverID);

    const history = useHistory();

    const editOrder = async () => {
        const editedOrder = { dateTime, totalPrice:Number(totalPrice), serverID:Number(serverID) };
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
        history.push("/");
    };

    return (
        <div>
            <h1>Edit Order</h1>
            <input
                type="text"
                value={dateTime}
                onChange={e => setDateTime(e.target.value)} />
            <input
                type="text"
                value={totalPrice}
                onChange={e => setTotalPrice(e.target.value)} />
            <input
                type="text"
                value={serverID}
                onChange={e => setServerID(e.target.value)} />
            <button
                onClick={editOrder}
            >Save</button>
        </div>
    );
}

export default EditOrderPage;