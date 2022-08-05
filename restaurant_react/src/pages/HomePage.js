// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';

function HomePage({ setDishToEdit }) {
    return (
        <>
            <h1>A database application to manage food waste at a restaurant</h1>
            <p>This is an application to create, edit, and delete records of
                ingredients, dishes, orders, suppliers, and servers.
            </p>
        </>
    );
}

export default HomePage;