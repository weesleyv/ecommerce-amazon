import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { basketReducer } from "./reducers/basketReducers";
import { userSigninReducer } from "./reducers/userReducers";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

const basketItems = Cookie.getJSON("basketItems") || [];
const userInfo = Cookie.getJSON("userOnfo") || null

const initialState = {basket: {basketItems}, userSignin: {userInfo} };

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  basket: basketReducer,
  userSignin: userSigninReducer
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
