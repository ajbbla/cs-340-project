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
import ViewDishIngredientsPage from './pages/ViewDishIngredientsPage';
import CreateDishIngredientPage from './pages/CreateDishIngredientPage';
import EditDishIngredientPage from './pages/EditDishIngredientPage';
import ViewSuppliersPage from './pages/ViewSuppliersPage';
import CreateSupplierPage from './pages/CreateSupplierPage';
import EditSupplierPage from './pages/EditSupplierPage';
import ViewPurchasesPage from './pages/ViewPurchasesPage';
import CreatePurchasePage from './pages/CreatePurchasePage';
import EditPurchasePage from './pages/EditPurchasePage';
import ViewServersPage from './pages/ViewServersPage';
import CreateServerPage from './pages/CreateServerPage';
import EditServerPage from './pages/EditServerPage';
import ViewIngredientSubstitutesPage from './pages/ViewIngredientSubstitutesPage';
import CreateIngredientSubstitutePage from './pages/CreateIngredientSubstitutePage';
import EditIngredientSubstitutePage from './pages/EditIngredientSubstitutePage';
import Navigation from './components/Navigation';
import { useState, useEffect } from 'react';

function App() {
  const [orderToEdit, setOrderToEdit] = useState();
  const [dishToEdit, setDishToEdit] = useState();
  const [orderDishToEdit, setOrderDishToEdit] = useState();
  const [ingredientToEdit, setIngredientToEdit] = useState();
  const [dishIngredientToEdit, setDishIngredientToEdit] = useState();
  const [supplierToEdit, setSupplierToEdit] = useState();
  const [purchaseToEdit, setPurchaseToEdit] = useState();
  const [serverToEdit, setServerToEdit] = useState();
  const [ingredientSubstituteToEdit, setIngredientSubstituteToEdit] = useState();

  const [orders, setOrders] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [substitutes, setSubstitutes] = useState([]);
  const [servers, setServers] = useState([]);

  const loadOrders = async () => {
    const response = await fetch('/orders');
    const orders = await response.json();
    setOrders(orders);
  }

  const loadDishes = async () => {
    const response = await fetch('/dishes');
    const dishes = await response.json();
    setDishes(dishes);
  }

  const loadIngredients = async () => {
      const response = await fetch('/ingredients');
      const ingredients = await response.json();
      setIngredients(ingredients);
  }

  const loadSubstitutes = async () => {
      const response = await fetch('/ingredients');
      const substitutes = await response.json();
      setSubstitutes(substitutes);
  }

  const loadSuppliers = async () => {
    const response = await fetch('/suppliers');
    const suppliers = await response.json();
    setSuppliers(suppliers);
}

const loadServers = async () => {
  const response = await fetch('/servers');
  const servers = await response.json();
  setServers(servers);
}

  useEffect(() => {
      loadOrders();
      loadDishes();
      loadIngredients();
      loadSuppliers();
      loadSubstitutes();
      loadServers();
  }, []);

  const addOrderDish = async (orderID, dishName, quantity, history) => {
    if (!orderID || !dishName) {
        alert("Please select both an orderID and a dishName");
    } else {
        const newOrderDish = { orderID:Number(orderID), dishName, quantity:Number(quantity) };
        const response = await fetch('/orderDishes', {
            method: 'POST',
            body: JSON.stringify(newOrderDish),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // if(response.status === 201){
        //     alert("Successfully added the orderDish!");
        // } else {
        //     alert(`Failed to add orderDish, status code = ${response.status}`);
        // }
        // history.push("/view-orderDishes");
    }
};

  return (
    <div className="App">
      <header>
          <h1>Waste Not: A Restaurant DB Admin Portal</h1>
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
            <CreateOrderPage servers={servers} dishes={dishes} addOrderDish={addOrderDish} loadOrders={loadOrders} orders={orders} />
          </Route>
          <Route path="/edit-order">
            <EditOrderPage orderToEdit={orderToEdit} servers={servers} />
          </Route>

          <Route path="/view-dishes">
            <ViewDishesPage setDishToEdit={setDishToEdit} dishes={dishes} setDishes={setDishes} loadDishes={loadDishes} ingredients={ingredients} />
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
            <ViewIngredientsPage setIngredientToEdit={setIngredientToEdit} ingredients={ingredients} setIngredients={setIngredients} loadIngredients={loadIngredients} loadSubstitutes={loadSubstitutes} />
          </Route>
          <Route path="/add-ingredient">
            <CreateIngredientPage />
          </Route>
          <Route path="/edit-ingredient">
            <EditIngredientPage ingredientToEdit={ingredientToEdit} />
          </Route>

          <Route path="/view-dishIngredients">
            <ViewDishIngredientsPage setDishIngredientToEdit={setDishIngredientToEdit} />
          </Route>
          <Route path="/add-dishIngredient">
            <CreateDishIngredientPage dishes={dishes} ingredients={ingredients} />
          </Route>
          <Route path="/edit-dishIngredient">
            <EditDishIngredientPage dishIngredientToEdit={dishIngredientToEdit} dishes={dishes} ingredients={ingredients} />
          </Route>

          <Route path="/view-suppliers">
            <ViewSuppliersPage setSupplierToEdit={setSupplierToEdit} suppliers={suppliers} setSuppliers={setSuppliers} loadSuppliers={loadSuppliers} />
          </Route>
          <Route path="/add-supplier">
            <CreateSupplierPage />
          </Route>
          <Route path="/edit-supplier">
            <EditSupplierPage supplierToEdit={supplierToEdit} />
          </Route>

          <Route path="/view-purchases">
            <ViewPurchasesPage setPurchaseToEdit={setPurchaseToEdit} />
          </Route>
          <Route path="/add-purchase">
            <CreatePurchasePage suppliers={suppliers} ingredients={ingredients} />
          </Route>
          <Route path="/edit-purchase">
            <EditPurchasePage purchaseToEdit={purchaseToEdit} suppliers={suppliers} ingredients={ingredients} />
          </Route>

          <Route path="/view-servers">
            <ViewServersPage setServerToEdit={setServerToEdit} servers={servers} setServers={setServers} loadServers={loadServers} />
          </Route>
          <Route path="/add-server">
            <CreateServerPage />
          </Route>
          <Route path="/edit-server">
            <EditServerPage serverToEdit={serverToEdit} />
          </Route>

          <Route path="/view-ingredientSubstitutes">
            <ViewIngredientSubstitutesPage setIngredientSubstituteToEdit={setIngredientSubstituteToEdit} />
          </Route>
          <Route path="/add-ingredientSubstitute">
            <CreateIngredientSubstitutePage ingredients={ingredients} substitutes={substitutes} />
          </Route>
          <Route path="/edit-ingredientSubstitute">
            <EditIngredientSubstitutePage ingredientSubstituteToEdit={ingredientSubstituteToEdit} ingredients={ingredients} substitutes={substitutes} />
          </Route>
        </div>
      </Router>
      <br></br>
      <footer>© 2022 Allen Blanton and Matthew Immerman</footer>
    </div>
  );
}

export default App;