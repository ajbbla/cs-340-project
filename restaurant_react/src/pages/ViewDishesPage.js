// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import DishList from '../components/DishList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import IngredientName from '../components/IngredientName';
import DishFilterList from '../components/DishFilterList';

function ViewDishesPage({ setDishToEdit, dishes, setDishes, loadDishes, ingredients }) {
    const history = useHistory();
    const [ingredientName, setIngredientName] = useState('');
    const [dishesFilter, setDishesFilter] = useState([]);

    useEffect(() => {
        loadDishes();
    }, []);

    const onDelete = async _id => {
        const response = await fetch(`/dishes/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setDishes(dishes.filter(e => e._id !== _id));
            loadDishes();
        } else {
            console.error(`Failed to delete dish with id = ${_id}, status code = ${response.status}`)
        } 
    }

    const onEdit = dish => {
        setDishToEdit(dish);
        history.push("/edit-dish");
    }

    const onFilter = async ingredientName => {
        const response = await fetch(`/dishesByIngredient/${ingredientName}`);
        const dishesFilter = await response.json();
        setDishesFilter(dishesFilter);
        // loadDishes();
      }

    return (
        <>
            <h2>List of Dishes</h2>
            <DishList dishes={dishes} onDelete={onDelete} onEdit={onEdit}></DishList>

            <div>
                <h1>Filter Dishes by Ingredient</h1>
                <select name="ingredientName" onChange={e => setIngredientName(e.target.value)} value={ingredientName}>
                    {ingredients.map((ingredient, i) => <IngredientName ingredient={ingredient} key={i} />)}
                </select>
                <button
                    onClick={() => {
                        onFilter(ingredientName);
                    }}
                >Filter</button>
            </div>

            <h2>Filtered List of Dishes</h2>
            <DishFilterList dishesFilter={dishesFilter}></DishFilterList>
        </>
    );
}

export default ViewDishesPage;
