import React from 'react';

function SupplierID({ supplierID, supplier }) {
    return (
        <option value={supplier.supplierID}>{supplier.supplierID}</option>
    );
}

export default SupplierID;