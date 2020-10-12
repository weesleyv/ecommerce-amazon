import * as productActions from "../actionTypes/productConst";

function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case productActions.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case productActions.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        success: true
      };
    case productActions.PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
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

function productSaveReducer(state = { product: {} }, action) {
  switch (action.type) {
    case productActions.PRODUCT_SAVE_REQUEST:
      return {
        loading: true,
        productId: action.payload,
      };
    case productActions.PRODUCT_SAVE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case productActions.PRODUCT_SAVE_FAIL:
      return {
        loading: false,
        product: action.payload,
      };
    default:
      return state;
  }
}

function productDeleteReducer(state = {product: {}}, action) {
  switch(action.type) {
    case productActions.PRODUCT_DELETE_REQUEST:
      return {loading: true }
    case productActions.PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: true
      }
    case productActions.PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}


export { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer };
