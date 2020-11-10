import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../redux/actions/userActions";
import "./Register.css";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const {loading, userInfo, error} = useSelector(state => state.userRegister)
  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect)
    }
  }, [userInfo])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  return (
    <div className="register">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"
          alt="logo"
        />
      </Link>
      <div className="register__container">
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>{error.message}</div>}
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
          <h5>Your Name</h5>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <h5>Email</h5>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h5>Password</h5>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <h5>Re-enter Password</h5>
          <input
            type="password"
            name="rePassword"
            onChange={(e) => setRePassword(e.target.value)}
          />
          <button type="submit" className="register__createButton">
            Create your Amazon account
          </button>
        </form>
        <div className="register__terms">
          <p>
            By creating an account, you agree to Amazon's Conditions of Use and
            Privacy Notice.
          </p>
        </div>
        <div className="register__border"></div>
        <p>
          Already have an account? <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
