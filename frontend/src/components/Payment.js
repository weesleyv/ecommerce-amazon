import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {savePayment} from "../redux/actions/basketActions";
import "./Shipping.css";
import CheckoutSteps from "./CheckoutSteps";

function Payment(props) {
    const dispatch = useDispatch()
    const [payment, setPayment] = useState('')

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(savePayment(payment))
        props.history.push("placeorder")
    }
  return (
    <div className="login">
      <CheckoutSteps step1 step2 step3/>  
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"
          alt="logo"
        />
      </Link>
      <div className="login__container">
        <h1>Payment</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="paymentMethod">Paypal</label>
          <input
            type="radio"
            name="paymentMethod"
            id="paymentMethod"
            value="paypal"
            onChange={(e) => setPayment(e.target.value)}
          />
          <button type="submit" className="login__signinButton">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
