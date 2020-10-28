import * as orderActions from "../actionTypes/orderConsts";

function orderCreateReducer(state = {order: {}}, action) {
  switch (action.type) {
    case orderActions.CREATE_ORDER_REQUEST:
      return { loading: true };
    case orderActions.CREATE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case orderActions.CREATE_ORDER_FAIL:
      return { laoding: false, success: false, error: action.payload };
    default:
      return state;
  }
}

function orderDetailsRuducer(
  state = {
    order: {
      data: {
        orderItems: [],
        shipping: {},
        payment: {},
      },
    },
  },
  action
) {
  switch (action.type) {
    case orderActions.ORDER_DETAILS_REQUEST:
      return { loading: true };
    case orderActions.ORDER_DETAILS_SUCCESS:
      return { loading: false, orderDetails: action.payload };
    case orderActions.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function orderPayReducer(
  state = {
    order: {
      orderItems: [],
      shipping: {},
      payment: {},
    },
  },
  action
) {
  switch (action.type) {
    case orderActions.ORDER_PAY_REQUEST:
      return { loading: true };
    case orderActions.ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case orderActions.ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { orderCreateReducer, orderDetailsRuducer, orderPayReducer };
