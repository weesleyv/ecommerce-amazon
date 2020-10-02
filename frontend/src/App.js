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
import { useSelector } from "react-redux";

function App({ location }) {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <div className="app">
      {location.pathname !== "/signin" && <Header />}
      <SideMenu />
      <Switch>
        <Route path="/signin" component={Login} />
        <Route path="/checkout/:id?" component={Checkout} />

        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
