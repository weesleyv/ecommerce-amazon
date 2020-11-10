import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, update } from "../redux/actions/userActions";
import { listMyOrders } from "../redux/actions/orderActions";

function Profile(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.userUpdate);
  const { userInfo } = useSelector((state) => state.userSignin);
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }));
  };

  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrders, orders, error: errorOrders } = orderList;
  console.log(orders)

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    } else {
      props.history.push("/signin")
    }
    dispatch(listMyOrders())
  }, [userInfo, dispatch]);
  return (
    <div className="profile">
      <div className="profile__info">
        <div className="register__container">
          <h1>User Profile</h1>
          {loading && <div>Loading...</div>}
          {error && <div style={{ color: "red" }}>{error.message}</div>}
          {success && <div>Profile updated</div>}
          <form onSubmit={submitHandler}>
            <h5>Your Name</h5>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <h5>Email</h5>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h5>Password</h5>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="register__createButton">
              Update
            </button>
            <button
              type="button"
              className="profile__logoutBtn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
      <div className="profile__orders">
        {loadingOrders ? (
          <div>Loading...</div>
        ) : errorOrders ? (
          <div>{errorOrders}</div>
        ) : (
          <table className="profile__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid}</td>
                  <td>
                    <Link to={`/orders/${order._id}`}>DETAILS</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Profile;
