import * as orderActions from "../actionTypes/orderConsts";

const createOrder = (order) => (dispatch, getState) => {
  dispatch({ type: orderActions.CREATE_ORDER_REQUEST, payload: order });
  const {
    userSignin: { userInfo },
  } = getState();
  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userInfo.token,
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: orderActions.CREATE_ORDER_SUCCESS,
        payload: data,
      })
    )
    .catch((error) =>
      dispatch({
        type: orderActions.CREATE_ORDER_FAIL,
        payload: error.message,
      })
    );
};

const orderDetailsAction = (orderId) => (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();

  dispatch({
    type: orderActions.ORDER_DETAILS_REQUEST,
    payload: orderId,
  });

  fetch(`/api/orders/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: orderActions.ORDER_DETAILS_SUCCESS,
        payload: data,
      })
    )
    .catch((error) =>
      dispatch({
        type: orderActions.ORDER_DETAILS_FAIL,
        payload: error.message,
      })
    );
};

const listMyOrders = () => (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();

  dispatch({
    type: orderActions.ORDER_LIST_REQUEST,
  });

  fetch("/api/orders/myorders", {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: orderActions.ORDER_LIST_SUCCESS,
        payload: data,
      });
    })
    .catch((error) =>
      dispatch({
        type: orderActions.ORDER_LIST_FAIL,
        payload: error.message,
      })
    );
};

const payOrder = (order, paymentResult) => (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  console.log("Payorder", order);
  dispatch({
    type: orderActions.ORDER_PAY_REQUEST,
    payload: paymentResult,
  });
  fetch(`/api/orders/${order._id}/pay`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: orderActions.ORDER_PAY_SUCCESS,
        payload: data,
      })
    )
    .catch((error) =>
      dispatch({
        type: orderActions.ORDER_PAY_FAIL,
        payload: error,
      })
    );
};

const listOrders = () => (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();

  dispatch({
    type: orderActions.ADMINORDER_LIST_REQUEST,
  });

  fetch("/api/orders", {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: orderActions.ADMINORDER_LIST_SUCCESS,
        payload: data,
      });
    })
    .catch((error) =>
      dispatch({
        type: orderActions.ADMINORDER_LIST_FAIL,
        payload: error.message,
      })
    );
};

const deleteOrder = (orderID) => (dispatch, getState) => {
  dispatch({
    type: orderActions.ORDER_DELETE_REQUEST,
    payload: orderID,
  });

  const {
    userSignin: { userInfo },
  } = getState();

  fetch(`/api/orders/${orderID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userInfo.token,
    },
  })
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: orderActions.ORDER_DELETE_SUCCESS,
        payload: data,
      })
    )
    .catch((error) =>
      dispatch({
        type: orderActions.ORDER_DELETE_FAIL,
        payload: error,
      })
    );
};

export {
  createOrder,
  orderDetailsAction,
  payOrder,
  listMyOrders,
  listOrders,
  deleteOrder,
};
