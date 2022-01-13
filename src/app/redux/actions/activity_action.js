import axios from "./interceptors";
import { baseUrl } from "../../config/globalConfig";
import {
    ADD_ACTIVITY, REMOVE_ACTIVITY, EDIT_ACTIVITY, GET_ALL_ACTIVITY, GET_ACTIVITY,
    ADD_ACTIVITY_CATEGORY, GET_ACTIVITY_CATEGORIES, GET_ACTIVITY_CATEGORY, DELETE_ACTIVITY_CATEGORY, EDIT_ACTIVITY_CATEGORY,
    ADD_ACTIVITY_TYPE, GET_ACTIVITY_TYPES, GET_ACTIVITY_TYPE, DELETE_ACTIVITY_TYPE, EDIT_ACTIVITY_TYPE, GET_ALL_ACTIVITY_DATA,

} from '../types';


import Cookies from "universal-cookie";
const cookies = new Cookies();
// axios.defaults.headers['auth'] = localStorage.getItem('w_auth');

export function addActivity(dataToSubmit) {
    const request = axios
        .post(`${baseUrl}/activity`, dataToSubmit,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: ADD_ACTIVITY,
        payload: request,
    };
}

export function editActivity(id, data) {
    const request = axios
        .put(`${baseUrl}/activity/${id}`, data,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: EDIT_ACTIVITY,
        payload: request,
    };
}


export function getAllActivity() {
    const request = axios
        .get(`${baseUrl}/activity`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: GET_ALL_ACTIVITY,
        payload: request,
    };
}



export function getAllActivityData() {
    const request = axios
        .get(`${baseUrl}/activity/getActivityData`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: GET_ALL_ACTIVITY_DATA,
        payload: request,
    };
}

export function getActivity() {
    const request = axios
        .get(`${baseUrl}/activity`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: GET_ACTIVITY,
        payload: request,
    };
}


export function removeActivity(id) {
    const request = axios
        .delete(`${baseUrl}/activity/${id}`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: REMOVE_ACTIVITY,
        payload: request,
    };
}



//////////////activity category

export function addActivityCategory(dataToSubmit) {
    const request = axios
        .post(`${baseUrl}/activity/category`, dataToSubmit,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: ADD_ACTIVITY_CATEGORY,
        payload: request,
    };
}

export function editActivityCategory() {
    const request = axios
        .put(`${baseUrl}/activity`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: EDIT_ACTIVITY_CATEGORY,
        payload: request,
    };
}


export function getAllActivityCategories() {
    const request = axios
        .get(`${baseUrl}/activity`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: GET_ACTIVITY_CATEGORIES,
        payload: request,
    };
}

export function getActivityCategory() {
    const request = axios
        .get(`${baseUrl}/activity`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: GET_ACTIVITY_CATEGORY,
        payload: request,
    };
}


export function removeActivityCategory() {
    const request = axios
        .delete(`${baseUrl}/activity`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: DELETE_ACTIVITY_CATEGORY,
        payload: request,
    };
}





//////////////activity type

export function addActivityType(dataToSubmit) {
    const request = axios
        .post(`${baseUrl}/activity/category`, dataToSubmit,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: ADD_ACTIVITY_TYPE,
        payload: request,
    };
}

export function editActivityType() {
    const request = axios
        .put(`${baseUrl}/activity`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: EDIT_ACTIVITY_TYPE,
        payload: request,
    };
}


export function getAllActivityTypes() {
    const request = axios
        .get(`${baseUrl}/activity`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: GET_ACTIVITY_TYPES,
        payload: request,
    };
}

export function getActivityType() {
    const request = axios
        .get(`${baseUrl}/activity`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: GET_ACTIVITY_TYPE,
        payload: request,
    };
}


export function removeActivityType() {
    const request = axios
        .delete(`${baseUrl}/activity`,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

    return {
        type: DELETE_ACTIVITY_TYPE,
        payload: request,
    };
}
