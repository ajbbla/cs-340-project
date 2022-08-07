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
import ViewOrderDishesPage from './pages/ViewOrderDishesPage';
import CreateOrderDishPage from './pages/CreateOrderDishPage';
import EditOrderDishPage from './pages/EditOrderDishPage';
import ViewIngredientsPage from './pages/ViewIngredientsPage';
import CreateIngredientPage from './pages/CreateIngredientPage';
import EditIngredientPage from './pages/EditIngredientPage';
import ViewServersPage from './pages/ViewServersPage';
import CreateServerPage from './pages/CreateServerPage';
import EditServerPage from './pages/EditServerPage';
import Navigation from './components/Navigation';
import { useState, useEffect } from 'react';

function App() {
  const [orderToEdit, setOrderToEdit] = useState();
  const [dishToEdit, setDishToEdit] = useState();
  const [orderDishToEdit, setOrderDishToEdit] = useState();
  const [ingredientToEdit, setIngredientToEdit] = useState();
  const [serverToEdit, setServerToEdit] = useState();

  const [orders, setOrders] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [servers, setServers] = useState([]);


  const loadOrders = async () => {
    const response = await fetch('/orders');
    const orders = await response.json();
    // console.log(orders);
    setOrders(orders);
  }

  const loadDishes = async () => {
    const response = await fetch('/dishes');
    const dishes = await response.json();
    setDishes(dishes);
  }

  useEffect(() => {
      loadOrders();
      loadDishes();
  }, []);

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
            <ViewOrdersPage setOrderToEdit={setOrderToEdit} orders={orders} setOrders={setOrders} loadOrders={loadOrders} />
          </Route>
          <Route path="/add-order">
            <CreateOrderPage />
          </Route>
          <Route path="/edit-order">
            <EditOrderPage orderToEdit={orderToEdit} />
          </Route>

          <Route path="/view-dishes">
            <ViewDishesPage setDishToEdit={setDishToEdit} dishes={dishes} setDishes={setDishes} loadDishes={loadDishes} />
          </Route>
          <Route path="/add-dish">
            <CreateDishPage />
          </Route>
          <Route path="/edit-dish">
            <EditDishPage dishToEdit={dishToEdit} />
          </Route>
          
          <Route path="/view-orderDishes">
            <ViewOrderDishesPage setOrderDishToEdit={setOrderDishToEdit} />
          </Route>
          <Route path="/add-orderDish">
            <CreateOrderDishPage orders={orders} dishes={dishes} />
          </Route>
          <Route path="/edit-orderDish">
            <EditOrderDishPage orderDishToEdit={orderDishToEdit} orders={orders} dishes={dishes} />
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

          <Route path="/view-servers">
            <ViewServersPage setServerToEdit={setServerToEdit} servers={servers} setServers={setServers} />
          </Route>
          <Route path="/add-server">
            <CreateServerPage />
          </Route>
          <Route path="/edit-server">
            <EditServerPage serverToEdit={serverToEdit} />
          </Route>
        </div>
      </Router>
      <br></br>
      <footer>© 2022 Allen Blanton and Matthew Immerman</footer>
    </div>
  );
}

export default App;