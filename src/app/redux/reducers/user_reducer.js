import {
    LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER, FORGET_PASSWORD, PASSWORD_CHANGE, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAILURE
    , EDIT_USER_DETAIL, USER_DETAIL,
    REGISTER_EMP, GET_ALL_EMP, GET_EMP, UPDATE_EMP, REMOVE_EMP, REMOVE_BREEDER
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case REMOVE_BREEDER:
            return { ...state, removeBreeder: action.payload }

        case REGISTER_EMP:
            return { ...state, registerEmp: action.payload }
        case GET_ALL_EMP:
            return { ...state, getAllEmp: action.payload }
        case GET_EMP:
            return { ...state, getEmp: action.payload }
        case UPDATE_EMP:
            return { ...state, updateEmp: action.payload }
        case REMOVE_EMP:
            return { ...state, removeEmp: action.payload }

        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            if (action.payload.data) {
                if (action.payload.data?.subscriber)
                    window.localStorage.setItem('subscriber', JSON.stringify(action.payload.data.subscriber));
                return { ...state, userData: action.payload, username: action.payload.data.name, useremail: action.payload.data.email, userId: action.payload.data._id }
            }
            return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state, logout: action.payload }
        case FORGET_PASSWORD:
            return { ...state, forgetPassword: action.payload }
        case FORGET_PASSWORD_SUCCESS:
            return { ...state, forgetPassword: action.payload, isSuccess: true }
        case FORGET_PASSWORD_FAILURE:
            return { ...state, forgetPassword: action.payload, isSuccess: false }
        case PASSWORD_CHANGE:
            return { ...state, passwordChange: action.payload }
        case USER_DETAIL:
            return { ...state, userDetail: action.payload }
        case EDIT_USER_DETAIL:
            return { ...state, editDetail: action.payload }
        default:
            return state;
    }
}
