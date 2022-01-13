import axios from "axios";
import { baseUrl } from "../../config/globalConfig";
import {
    ADD_CONTACT, REMOVE_CONTACT, EDIT_CONTACT, GET_ALL_CONTACT, GET_CONTACT,
    ADD_CONTACT_CATEGORY, GET_CONTACT_CATEGORIES, GET_CONTACT_CATEGORY, DELETE_CONTACT_CATEGORY, EDIT_CONTACT_CATEGORY, SOFT_REMOVE_CONTACT, SOFT_REMOVE_CONTACT_BY_CATEGORY
} from '../types';


import Cookies from "universal-cookie";
const cookies = new Cookies();
axios.defaults.headers['auth'] = localStorage.getItem('w_auth');


export function addContact(dataToSubmit) {
    const request = axios
        .post(`${baseUrl}/contact`, dataToSubmit,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: ADD_CONTACT,
        payload: request,
    };
}

export function editContact(data, id) {
    const request = axios
        .put(`${baseUrl}/contact/${id}`, data,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: EDIT_CONTACT,
        payload: request,
    };
}


export function getAllContact() {
    const request = axios
        .get(`${baseUrl}/contact/categories/all`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: GET_ALL_CONTACT,
        payload: request,
    };
}





export function getContact() {
    const request = axios
        .get(`${baseUrl}/contact`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: GET_CONTACT,
        payload: request,
    };
}


export function removeContact() {
    const request = axios
        .delete(`${baseUrl}/contact`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: REMOVE_CONTACT,
        payload: request,
    };
}


export function softRemoveContact(id) {
    console.log(id);
    const request = axios
        .delete(`${baseUrl}/contact/soft/${id}`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: SOFT_REMOVE_CONTACT,
        payload: request,
    };
}

// /soft/category/:category

export function softRemoveContactByCategory(categoryId) {
    console.log(categoryId);
    const request = axios
        .delete(`${baseUrl}/contact/soft/category/${categoryId}`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: SOFT_REMOVE_CONTACT_BY_CATEGORY,
        payload: request,
    };
}

//////////////contact category

export function addContactCategory(dataToSubmit) {
    const request = axios
        .post(`${baseUrl}/contact/category`, dataToSubmit,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: ADD_CONTACT_CATEGORY,
        payload: request,
    };
}

export function editContactCategory() {
    const request = axios
        .put(`${baseUrl}/contact`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: EDIT_CONTACT_CATEGORY,
        payload: request,
    };
}


export function getContactCategories() {
    const request = axios
        .get(`${baseUrl}/contact`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: GET_CONTACT_CATEGORIES,
        payload: request,
    };
}

export function getContactCategory() {
    const request = axios
        .get(`${baseUrl}/contact` , { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: GET_CONTACT_CATEGORY,
        payload: request,
    };
}


export function removeContactCategory() {
    const request = axios
        .delete(`${baseUrl}/contact`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: DELETE_CONTACT_CATEGORY,
        payload: request,
    };
}


