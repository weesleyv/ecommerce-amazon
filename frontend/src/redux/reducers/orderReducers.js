import * as orderActions from "../actionTypes/orderConsts";

function orderCreateReducer(state = { order: {} }, action) {
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
        orderItems: [],
        shipping: {},
        payment: {},
    },
  },
  action
) {
  switch (action.type) {
    case orderActions.ORDER_DETAILS_REQUEST:
      return { loading: true };
    case orderActions.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case orderActions.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function myOrderListReducer(state = { orders: [] }, action) {
  switch (action.type) {
    case orderActions.ORDER_LIST_REQUEST:
      return { loading: true };
    case orderActions.ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case orderActions.ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function adminOrderListReducer(state = { orders: [] }, action) {
  switch (action.type) {
    case orderActions.ADMINORDER_LIST_REQUEST:
      return { loading: true };
    case orderActions.ADMINORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case orderActions.ADMINORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function orderDeleteReducer(
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
    case orderActions.ORDER_DELETE_REQUEST:
      return { loading: true };
    case orderActions.ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case orderActions.ORDER_DELETE_FAIL:
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
    case orderActions.ORDER_PAY_RESET:
      return state
    default:
      return state;
  }
}

export {
  orderCreateReducer,
  orderDetailsRuducer,
  orderPayReducer,
  myOrderListReducer,
  adminOrderListReducer,
  orderDeleteReducer
};
