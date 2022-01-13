import axios from 'axios';
import {CREATE_ELEMENT,UPDATE_ELEMENT,DELETE_ELEMENT,GET_ELEMENT,GET_ELEMENTS,
    CREATE_FORM,UPDATE_FORM,DELETE_FORM,GET_FORM,GET_FORMS} from './types';



export function createElement(data){
    const request = axios.post(`/element`,data,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);
    
    return {
        type: CREATE_ELEMENT,
        payload: request
    }
}


export function updateElement(id,data){
    const request = axios.put(`/element/${id}`,data,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);
    
    return {
        type: UPDATE_ELEMENT,
        payload: request
    }
}



export function deleteElement(id){
    const request = axios.delete(`/element/${id}`,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);
    
    return {
        type: DELETE_ELEMENT,
        payload: request
    }
}


export function getElement(id){
    const request = axios.get(`/element/${id}`,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);
    
    return {
        type: GET_ELEMENT,
        payload: request
    }
}



//specific to breeder
export function getElements(){
    const request = axios.get(`/element`,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);
    
    return {
        type: GET_ELEMENTS,
        payload: request
    }
}


///Form
export function createForm(data){
    const request = axios.post(`/form`,data,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);
    
    return {
        type: CREATE_FORM,
        payload: request
    }
}


export function updateForm(id,data){
    const request = axios.patch(`/form/${id}`,data,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);
    
    return {
        type: UPDATE_FORM,
        payload: request
    }
}



export function deleteForm(id){
    const request = axios.delete(`/form/${id}`,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);
    
    return {
        type: DELETE_FORM,
        payload: request
    }
}


export function getForm(id){
    const request = axios.get(`/form/${id}`,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);
    
    return {
        type: GET_FORM,
        payload: request
    }
}

export function getForms(){
    const request = axios.get(`/form/`,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);
    
    return {
        type: GET_FORMS,
        payload: request
    }
}

