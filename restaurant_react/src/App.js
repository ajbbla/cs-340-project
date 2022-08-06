// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ViewOrdersPage from './pages/ViewOrdersPage';
import CreateOrderPage from './pages/CreateOrderPage';
import EditOrderPage from './pages/EditOrderPage';
import ViewDishesPage from './pages/ViewDishesPage';
import CreateDishPage from './pages/CreateDishPage';
import EditDishPage from './pages/EditDishPage';
import ViewIngredientsPage from './pages/ViewIngredientsPage';
import CreateIngredientPage from './pages/CreateIngredientPage';
import EditIngredientPage from './pages/EditIngredientPage';
import Navigation from './components/Navigation';
import { useState } from 'react';

function App() {
  const [orderToEdit, setOrderToEdit] = useState();
  const [dishToEdit, setDishToEdit] = useState();
  const [ingredientToEdit, setIngredientToEdit] = useState();
  return (
    <div className="App">
      <header>
          <h1>For Each Page:</h1>
          <h2>Below is an Entity: an Object, Event, or Category</h2>
          <p>View the Entity Records in the table<br></br>
            Use the Relevant "Create..." Link to Add a Records<br></br>
            Click a "View..." Link to View a Different Entity<br></br>
            Click the Edit Icon (Pen) next to a Record<br></br>
            Click the Delete Icon (Trash) next to a Record
          </p>
      </header>
      <Router>
        <Navigation />
        <div className="App-header">
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/view-orders">
            <ViewOrdersPage setOrderToEdit={setOrderToEdit} />
          </Route>
          <Route path="/add-order">
            <CreateOrderPage />
          </Route>
          <Route path="/edit-order">
            <EditOrderPage orderToEdit={orderToEdit} />
          </Route>
          <Route path="/view-dishes">
            <ViewDishesPage setDishToEdit={setDishToEdit} />
          </Route>
          <Route path="/add-dish">
            <CreateDishPage />
          </Route>
          <Route path="/edit-dish">
            <EditDishPage dishToEdit={dishToEdit} />
          </Route>
         <Route path="/view-ingredients">
            <ViewIngredientsPage setIngredientToEdit={setIngredientToEdit} />
          </Route>
          <Route path="/add-ingredient">
            <CreateIngredientPage />
          </Route>
          <Route path="/edit-ingredient">
            <EditIngredientPage ingredientToEdit={ingredientToEdit} />
          </Route>
        </div>
      </Router>
      <br></br>
      <footer>© 2022 Allen Blanton and Matthew Immerman</footer>
    </div>
  );
}

export default App;