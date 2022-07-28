import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <Link to="/">Go to Home Page</Link>
            <br></br>
            <Link to="/add-order">Go to Create Order Page</Link>
        </nav>
    );
}

export default Navigation;