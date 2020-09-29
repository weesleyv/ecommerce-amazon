import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Header from './components/Header'
import Home from './components/Home'
import Checkout from './components/Checkout'
import ProductDetail from "./components/ProductDetail";
import SideMenu from "./components/SideMenu";

function App() {
  return (
    <Router>
      <div className="app">
      <Header />
      <SideMenu/>
        <Switch>
          <Route path="/checkout/:id?" component={Checkout} />
  
          <Route path="/login">
            <h1>login</h1>
          </Route>

          <Route path="/product/:id" component={ProductDetail}/>

          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
