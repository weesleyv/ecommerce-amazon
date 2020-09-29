import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { basketReducer } from "./reducers/basketReducers";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

const basketItems = Cookie.getJSON("basketItems") || [];

const initialState = {basket: {basketItems} };

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  basket: basketReducer,
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
