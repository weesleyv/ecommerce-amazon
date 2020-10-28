import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {saveShipping} from "../redux/actions/basketActions";
import "./Shipping.css";
import CheckoutSteps from "./CheckoutSteps";

function Shipping(props) {
    const dispatch = useDispatch()
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [postcode, setPostcode] = useState('')
    const [country, setCountry] = useState('')


    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(saveShipping({address, city, postcode, country}))
        props.history.push("payment")
    }
  return (
    <div className="login">
      <CheckoutSteps step1 step2/>  
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"
          alt="logo"
        />
      </Link>
      <div className="login__container">
        <h1>Shipping</h1>
        <form onSubmit={submitHandler}>
          <h5>Adress</h5>
          <input
            type="text"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <h5>City</h5>
          <input
            type="text"
            name="city"
            onChange={(e) => setCity(e.target.value)}
          />
          <h5>Post Code</h5>
          <input
            type="text"
            name="postcode"
            onChange={(e) => setPostcode(e.target.value)}
          />
          <h5>Country</h5>
          <input
            type="text"
            name="country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit" className="login__signinButton">
            Save shipping details
          </button>
        </form>
      </div>
    </div>
  );
}

export default Shipping;
