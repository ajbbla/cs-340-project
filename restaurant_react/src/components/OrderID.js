import React from 'react';

function OrderID({ order }) {
    return (
        <option value={order.orderID}>{order.orderID}</option>
    );
}

export default OrderID;