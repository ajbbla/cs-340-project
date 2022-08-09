// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';

function HomePage({ setDishToEdit }) {
    return (
        <>
            <h2>A database application to manage food waste at a restaurant</h2>
            <p>Create, View, Filter, Edit, and Delete records of ingredients, dishes, orders, suppliers, and servers, as well as their relationships.
            </p>
        </>
    );
}

export default HomePage;