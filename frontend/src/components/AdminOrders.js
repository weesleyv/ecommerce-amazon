import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrder, listOrders } from '../redux/actions/orderActions';
import "./AdminOrders.css";

function AdminOrders() {
  const orderList = useSelector((state) => state.adminOrderList);
  const { loading, orders, error } = orderList;
  console.log(orderList)
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    success: successDelete,
  } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete, dispatch]);

  const deleteHandler = (order) => {
    if (window.confirm("ARE YOU SURE?")) {
      dispatch(deleteOrder(order._id))
    }
  };
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="adminorders">
      {error && <div>{error}</div>}
      <div className="adminorders__header">
        <h3>Orders</h3>
      </div>
      <div className="adminorders__list">
        <table className="adminorders__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td>{order.totalPrice}</td>
                <td>{order.user.name}</td>
                <td>{order.isPaid.toString()}</td>
                <td>{order.paidAt}</td>
                <td>{order.isDelivered.toString()}</td>
                <td>{order.deliveredAt}</td>
                <td>
                  <Link to={"/orders/" + order._id} className="adminorders__orderButton">
                    Details
                  </Link>{" "}
                  <button
                    type="button"
                    onClick={() => deleteHandler(order)}
                    className="adminorders__orderButton"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
