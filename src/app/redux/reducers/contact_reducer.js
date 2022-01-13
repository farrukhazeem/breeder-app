import {
    ADD_CONTACT, REMOVE_CONTACT, EDIT_CONTACT, GET_ALL_CONTACT, GET_CONTACT,
    ADD_CONTACT_CATEGORY, GET_CONTACT_CATEGORIES, GET_CONTACT_CATEGORY, DELETE_CONTACT_CATEGORY, EDIT_CONTACT_CATEGORY
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_CONTACT:
            return { ...state, addContact: action.payload }
        case REMOVE_CONTACT:
            return { ...state, removeContact: action.payload }
        case EDIT_CONTACT:
            return { ...state, editContact: action.payload }
        case GET_ALL_CONTACT:
            return { ...state, getAllContact: action.payload }
        case GET_CONTACT:
            return { ...state, getContact: action.payload }


        case ADD_CONTACT_CATEGORY:
            return { ...state, addContactCategory: action.payload }
        case DELETE_CONTACT_CATEGORY:
            return { ...state, deleteContactCategory: action.payload }
        case EDIT_CONTACT_CATEGORY:
            return { ...state, editContactCategory: action.payload }
        case GET_CONTACT_CATEGORIES:
            return { ...state, getContactCategories: action.payload }
        case GET_CONTACT_CATEGORY:
            return { ...state, getContactCategory: action.payload }

        default:
            return state;
    }
}
