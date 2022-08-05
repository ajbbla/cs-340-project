// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ViewOrdersPage from './pages/ViewOrdersPage';
import CreateOrderPage from './pages/CreateOrderPage';
import EditOrderPage from './pages/EditOrderPage';
import ViewDishesPage from './pages/ViewDishesPage';
import CreateDishPage from './pages/CreateDishPage';
import EditDishPage from './pages/EditDishPage';
import Navigation from './components/Navigation';
import { useState } from 'react';

function App() {
  const [orderToEdit, setOrderToEdit] = useState();
  const [dishToEdit, setDishToEdit] = useState();
  return (
    <div className="App">
      <header>
          <h1>A database application to manage food waste at a restaurant</h1>
          <p>This is an application to create, edit, and delete records of
              ingredients, dishes, orders, suppliers, and servers.
          </p>
      </header>
      <Router>
        <Navigation />
        <div className="App-header">
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
        </div>
      </Router>
      <br></br>
      <footer>© 2022 Allen Blanton and Matthew Immerman</footer>
    </div>
  );
}

export default App;