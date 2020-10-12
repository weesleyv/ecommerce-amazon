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

function App({ location }) {
  const path =
    location.pathname !== "/signin" &&
    location.pathname !== "/register" &&
    location.pathname !== "/newproduct";
  return (
    <div className="app">
      {path && <Header />}
      <SideMenu />
      <Switch>
        <Route path="/signin" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/newproduct" component={CreateProduct} />
        <Route path="/checkout/:id?" component={Checkout} />

        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
