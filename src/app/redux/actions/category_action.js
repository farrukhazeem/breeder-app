import axios from 'axios';
import {
    CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, ADD_CATEGORY_SUB_TYPE,
    GET_CATEGORY, GET_CATEGORIES, GET_CATEGORIES_BY_TYPE, GET_CATEGORIES_INVENTORY_BY_BREEDER, UPDATE_CATEGORY_BY_ID
} from '../types';
import { baseUrl } from '../../config/globalConfig';
import Cookies from "universal-cookie";
const cookies = new Cookies();
axios.defaults.headers["auth"] = cookies.get("w_auth");


export function createCategory(data) {
    const request = axios.post(`${baseUrl}/category`, data, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: CREATE_CATEGORY,
        payload: request
    }
}


export function updateCategory(id, data) {
    const request = axios.patch(`${baseUrl}/category/${id}`, data, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: UPDATE_CATEGORY,
        payload: request
    }
}



export function updateCategoryById(id, data) {
    const request = axios.patch(`${baseUrl}/category/update/${id}`, data, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: UPDATE_CATEGORY_BY_ID,
        payload: request
    }
}


export function deleteCategory(id) {
    const request = axios.delete(`${baseUrl}/category/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: DELETE_CATEGORY,
        payload: request
    }
}


export function getCategory(id) {
    const request = axios.get(`${baseUrl}/category/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_CATEGORY,
        payload: request
    }
}




export function getCategories() {
    console.log('categories getting');
    const request = axios.get(`${baseUrl}/category/all`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_CATEGORIES,
        payload: request
    }
}

export function getCategoriesByType(type) {
    console.log('categories getting');
    const request = axios.get(`${baseUrl}/category/all?type=${type}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_CATEGORIES_BY_TYPE,
        payload: request
    }
}
export function addCategorySubType(type, categoryId) {
    console.log('updating sub type');
    const request = axios.put(`${baseUrl}/category/addtype/${categoryId}`, { type }, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: ADD_CATEGORY_SUB_TYPE,
        payload: request
    }
}



export function getCategoryInventoryByBreeder(type) {
    console.log('categories getting');
    const request = axios.get(`${baseUrl}/category/inventory/${localStorage.getItem('userId')}?type=${type}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_CATEGORIES_INVENTORY_BY_BREEDER,
        payload: request
    }
}

