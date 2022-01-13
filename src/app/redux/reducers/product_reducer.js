import {
    ADD_PRODUCT, DELETE_PRODUCT, GET_PRODUCT_BY_ID,
    EDIT_PRODUCT, GET_PRODUCT,
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return { ...state, create: action.payload }
        case EDIT_PRODUCT:
            return { ...state, edit: action.payload }
        case DELETE_PRODUCT:
            return { ...state, delete: action.payload }
        case GET_PRODUCT_BY_ID:
            return { ...state, get: action.payload }
        case GET_PRODUCT:
            return { ...state, getall: action.payload }
        default:
            return state;
    }
}
