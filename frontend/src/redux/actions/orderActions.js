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
      "Authorization": "Bearer " + userInfo.token,
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

const orderDetails = (orderId) => (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();

  dispatch({
    type: orderActions.ORDER_DETAILS_REQUEST,
    payload: orderId
  })

  fetch(`/api/orders/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  })
    .then(response => response.json())
    .then(data => dispatch({
      type: orderActions.ORDER_DETAILS_SUCCESS,
      payload: data
    }))
    .catch(error => dispatch({
      type: orderActions.ORDER_DETAILS_FAIL,
      payload: error.message
    }))
}

const payOrder = (order, paymentResult) => (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();

  dispatch({
    type: orderActions.ORDER_PAY_REQUEST,
    payload: paymentResult
  })
  fetch(`/api/orders/${order._id}/pay`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  })
    .then(response => response.json())
    .then(data => dispatch({
      type: orderActions.ORDER_PAY_SUCCESS,
      payload: data
    }))
    .catch(error => dispatch({
      type: orderActions.ORDER_PAY_FAIL,
      payload: error
    }))
}

export { createOrder, orderDetails, payOrder };
