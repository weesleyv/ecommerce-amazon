import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
} from "./reducers/productReducers";
import { basketReducer } from "./reducers/basketReducers";
import {
  userRegisterReducer,
  userSigninReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  adminOrderListReducer,
  myOrderListReducer,
  orderCreateReducer,
  orderDeleteReducer,
  orderDetailsRuducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

const basketItems = Cookie.getJSON("basketItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
  basket: { basketItems, shipping: {}, payment: {} },
  userSignin: { userInfo },
  orderCreate: {
    order: { data: { shipping: {}, payment: {}, orderItems: [] } },
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  basket: basketReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsRuducer,
  orderList: myOrderListReducer,
  orderPay: orderPayReducer,
  orderDelete: orderDeleteReducer,
  adminOrderList: adminOrderListReducer,
});

const composeEnhancer =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
