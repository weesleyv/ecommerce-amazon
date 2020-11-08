import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";

// components
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import ProductDetail from "./components/ProductDetail";
import SideMenu from "./components/SideMenu";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateProduct from "./components/CreateProduct";
import Shipping from "./components/Shipping";
import Payment from "./components/Payment";
import PlaceOrder from "./components/PlaceOrder";
import Order from "./components/Order";
import Profile from "./components/Profile";
import AdminOrders from "./components/AdminOrders";

function App({ location }) {
  const path =
    location.pathname !== "/signin" &&
    location.pathname !== "/register" &&
    location.pathname !== "/newproduct" &&
    location.pathname !== "/shipping" &&
    location.pathname !== "/payment"
  return (
    <div className="app">
      {path && <Header />}
      <SideMenu />
      <Switch>
        <Route path="/adminorders" component={AdminOrders} />
        <Route path="/profile" component={Profile} />
        <Route path="/signin" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/shipping" component={Shipping} />
        <Route path="/payment" component={Payment} />
        <Route path="/placeorder" component={PlaceOrder} />
        <Route path="/orders/:id" component={Order} />
        <Route path="/newproduct" component={CreateProduct} />
        <Route path="/checkout/:id?" component={Checkout} />

        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
