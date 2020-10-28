import * as productActions from "../actionTypes/productConst";

const detailsProduct = (productId) => (dispatch) => {
  dispatch({
    type: productActions.PRODUCT_DETAILS_REQUEST,
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

const saveProduct = (product) => (dispatch, getState) => {
  dispatch({ 
    type: productActions.PRODUCT_SAVE_REQUEST,
    payload: product 
  });
  const { userSignin: { userInfo } } = getState();
  if (!product._id) {
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        "Authorization": "Bearer " + userInfo.token
      },
      body: JSON.stringify(product)
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: productActions.PRODUCT_SAVE_SUCCESS,
          payload: data,
        })
      )
      .catch(error => dispatch({
        type: productActions.PRODUCT_SAVE_FAIL,
        payload: error.message
      }))
  } else {
    fetch("/api/products/" + product._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", 
        "Authorization": "Bearer " + userInfo.token
      },
      body: JSON.stringify(product)
    })
      .then((response) => response.json())
      .then((data) => 
        dispatch({
          type: productActions.PRODUCT_SAVE_SUCCESS,
          payload: data,
        })
      )
      .catch(error => dispatch({
        type: productActions.PRODUCT_SAVE_FAIL,
        payload: error.message
      }))
  }
};

const deleteProduct = (product) => (dispatch, getState) => {
  dispatch({
    type: productActions.PRODUCT_DELETE_REQUEST,
    payload: product
  })

  const { userSignin: { userInfo } } = getState();

  fetch("/api/products/" + product._id, {
    method: "DELETE",
    header: {
      "Content-Type": "application/json", 
      "Authorization": "Bearer " + userInfo.token
    }
  })
    .then(response => response.json())
    .then(data => dispatch({
      type: productActions.PRODUCT_DELETE_SUCCESS,
      payload: data,
      success: true
    }))
    .catch(error => dispatch({
      type: productActions.PRODUCT_DELETE_FAIL,
      payload: error
    }))
}

export { listProducts, detailsProduct, saveProduct, deleteProduct };
