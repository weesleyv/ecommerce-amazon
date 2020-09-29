import * as productActions from "../actionTypes/productConst";

const detailsProduct = (productId) => (dispatch) => {
  dispatch({
    type: productActions.PRODUCT_DETAILS_REQUEST
  });
  fetch(`/api/products/${productId}`)
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: productActions.PRODUCT_DETAILS_SUCCESS,
        payload: data,
      })
    )
    .catch((error) =>
      dispatch({
        type: productActions.PRODUCT_DETAILS_FAIL,
        payload: error.message,
      })
    );
};

const listProducts = () => (dispatch) => {
  dispatch({
    type: productActions.PRODUCT_LIST_REQUEST,
  });
  fetch("/api/products")
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: productActions.PRODUCT_LIST_SUCCESS,
        payload: data,
      })
    )
    .catch((err) =>
      dispatch({
        type: productActions.PRODUCT_LIST_FAIL,
        payload: err.message,
      })
    );
};

export { listProducts, detailsProduct };
