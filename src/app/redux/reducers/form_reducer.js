import {
    CREATE_FORM, UPDATE_FORM, DELETE_FORM, GET_FORM, GET_FORMS,
    DELETE_FORM_ADMIN
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case CREATE_FORM:
            return { ...state, createform: action.payload }
        case UPDATE_FORM:
            return { ...state, updateform: action.payload }
        case DELETE_FORM:
            return { ...state, deleteform: action.payload }
        case GET_FORM:
            return { ...state, getform: action.payload }
        case GET_FORMS:
            return { ...state, getforms: action.payload }
        case DELETE_FORM_ADMIN:
            return { ...state, deleteAdmin: action.payload }
        default:
            return state;
    }
}
