import * as userActions from '../actionTypes/userConsts';

function userSigninReducer(state={}, action) {
    switch(action.type) {
        case userActions.USER_SIGNIN_REQUEST:
            return {loading: true}
        case userActions.USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case userActions.USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export {userSigninReducer}