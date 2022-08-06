// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <Link to="/">Go to Home Page</Link>
            <br></br>
            <Link to="/view-orders">Go to View Orders Page</Link>
            <br></br>
            <Link to="/add-order">Go to Create Order Page</Link>
            <br></br>
            <Link to="/view-dishes">Go to View Dishes Page</Link>
            <br></br>
            <Link to="/add-dish">Go to Create Dish Page</Link>
            <br></br>
            <Link to="/view-ingredients">Go to View Ingredients Page</Link>
            <br></br>
            <Link to="/add-ingredient">Go to Create Ingredient Page</Link>
        </nav>
    );
}

export default Navigation;