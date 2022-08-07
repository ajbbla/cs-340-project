import React from 'react';

function SupplierName({ supplier }) {
    return (
        <option value={supplier.supplierName}>{supplier.supplierName}</option>
    );
}

export default SupplierName;