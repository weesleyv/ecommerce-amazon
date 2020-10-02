import Cookie from "js-cookie";
import * as userActions from "../actionTypes/userConsts";

const signin = (email, password) => (dispatch) => {
  dispatch({
    type: userActions.USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  fetch("/api/users/signin", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then(
      (data) =>
        dispatch({
          type: userActions.USER_SIGNIN_SUCCESS,
          payload: data,
        })
    )
    .then(data => Cookie.set("userInfo", JSON.stringify(data)))
    .catch((error) =>
      dispatch({
        type: userActions.USER_SIGNIN_FAIL,
        payload: error.message,
      })
    );
};

export { signin };
