import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {signin} from "../redux/actions/userActions";
import "./Login.css";

function Login(props) {
    const {loading, userInfo, error} = useSelector(state => state.userSignin)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo?._id) {
            props.history.push(redirect)
        }
    }, [userInfo, props.history, redirect])

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(signin(email,password))
    }
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"
          alt="logo"
        />
      </Link>
      <div className="login__container">
      {loading && <div>Loading...</div>}
      {userInfo?.errorMsg && <div style={{color: "red"}}>{userInfo.errorMsg}</div>}
        <h1>Sing In</h1>
        <form onSubmit={submitHandler}>
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
          <button type="submit" className="login__signinButton">
            Sign In
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="login__registerButton">
          Create your Amazon Account
        </Link>
      </div>
    </div>
  );
}

export default Login;
