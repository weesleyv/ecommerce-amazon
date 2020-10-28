import React, {useState} from "react";
import "./Profile.css";
import {useDispatch, useSelector} from "react-redux"
import { logout, update } from "../redux/actions/userActions";

function Profile() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const {loading, error} = useSelector(state => state.userUpdate)
    const handleLogout = () => {
        dispatch(logout())
    }
    const submitHandler = e => {
        e.preventDefault()
        dispatch(update(email, name, password))
    }
  return (
    <div className="profile">
      <div className="profile__info">
        <div className="register__container">
          {loading && <div>Loading...</div>}
          {error && <div style={{ color: "red" }}>{error.message}</div>}
          <h1>User Profile</h1>
          <form onSubmit={submitHandler}>
            <h5>Your Name</h5>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <h5>Email</h5>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <h5>Password</h5>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <h5>Re-enter Password</h5>
            <input
              type="password"
              name="rePassword"
            //   onChange={(e) => setRePassword(e.target.value)}
            />
            <button type="submit" className="register__createButton">
              Update
            </button>
            <button type="button" onClick={handleLogout} >
                Logout
            </button>
          </form>
        </div>
      </div>
      <div className="profile__orders"></div>
    </div>
  );
}

export default Profile;
