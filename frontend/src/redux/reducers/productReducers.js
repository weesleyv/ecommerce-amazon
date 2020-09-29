import * as productActions from "../actionTypes/productConst";

function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case productActions.PRODUCT_LIST_REQUEST:
      return { loading: true };
    case productActions.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case productActions.PRODUCT_LIST_FAIL:
      return {
        loading: false,
        products: action.payload,
      };
    default:
      return { ...state };
  }
}

function productDetailsReducer(state = { product: {} }, action) {
  switch (action.type) {
    case productActions.PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        productId: action.payload,
      };
    case productActions.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case productActions.PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        product: action.payload,
      };
    default:
      return { ...state };
  }
}

export { productListReducer, productDetailsReducer };
