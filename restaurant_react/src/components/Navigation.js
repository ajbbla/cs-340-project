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

            <Link to="/view-orderDishes">Go to View OrderDishes Page</Link>
            <br></br>
            <Link to="/add-orderDish">Go to Create OrderDish Page</Link>
            <br></br>

            <Link to="/view-ingredients">Go to View Ingredients Page</Link>
            <br></br>
            <Link to="/add-ingredient">Go to Create Ingredient Page</Link>
            <br></br>

            <Link to="/view-dishIngredients">Go to View DishIngredients Page</Link>
            <br></br>
            <Link to="/add-dishIngredient">Go to Create DishIngredient Page</Link>
            <br></br>

            <Link to="/view-suppliers">Go to View Suppliers Page</Link>
            <br></br>
            <Link to="/add-supplier">Go to Create Supplier Page</Link>
            <br></br>

            <Link to="/view-purchases">Go to View Purchases Page</Link>
            <br></br>
            <Link to="/add-purchase">Go to Create Purchase Page</Link>
            <br></br>

            <Link to="/view-servers">Go to View Servers Page</Link>
            <br></br>
            <Link to="/add-server">Go to Create Server Page</Link>
            <br></br>
        </nav>
    );
}

export default Navigation;