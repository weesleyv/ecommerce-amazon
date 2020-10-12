import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer, productDeleteReducer
} from "./reducers/productReducers";
import { basketReducer } from "./reducers/basketReducers";
import { userRegisterReducer, userSigninReducer } from "./reducers/userReducers";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

const basketItems = Cookie.getJSON("basketItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null

const initialState = {basket: {basketItems}, userSignin: {userInfo} };

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  basket: basketReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer
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
