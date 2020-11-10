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
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: userActions.USER_SIGNIN_SUCCESS,
        payload: data,
      })
    )
    .then((data) => data.payload._id ? Cookie.set("userInfo", JSON.stringify(data.payload)) : console.log(data))
    .catch((error) =>
      dispatch({
        type: userActions.USER_SIGNIN_FAIL,
        payload: error.message,
      })
    );
};

const register = (name, email, password) => (dispatch) => {
  dispatch({
    type: userActions.USER_REGISTER_REQUEST,
    payload: { name, email, password },
  });
  fetch("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: userActions.USER_REGISTER_SUCCESS,
        payload: data,
      })
    )
    .catch((error) =>
      dispatch({
        type: userActions.USER_REGISTER_FAIL,
        payload: error.message,
      })
    );
};

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({
    type: userActions.USER_LOGOUT,
  });
};

const update = ({userId, name, email, password}) => (dispatch, getState) => {
  dispatch({
    type: userActions.USER_UPDATE_REQUEST,
    payload: userId,
    name,
    email,
    password,
  });
  const { userSignin: { userInfo } } = getState();
  fetch(`/api/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + userInfo.token
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: userActions.USER_UPDATE_SUCCESS,
        payload: data,
      });
    })
    .then((data) => Cookie.set("userInfo", JSON.stringify(data.payload)))
    .catch((error) =>
      dispatch({
        type: userActions.USER_UPDATE_FAIL,
        payload: error,
      })
    );
};

// const fetchData = (url, body, userActionSuccess, userActionFail, cookie, dispatch) => {
//   fetch(url, body)
//     .then(response => response.json())
//     .then(data => dispatch({
//       type: userActionSuccess,
//       payload: data
//     }))
//     .then(data => {
//       if (cookie) {
//         Cookie.set(cookie, JSON.stringify(data.payload))
//       }
//     })
//     .catch(error => dispatch({
//       type: userActionFail,
//       payload: error
//     }))
// }

export { signin, register, logout, update };
