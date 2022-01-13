import axios from 'axios';
import {
    GET_FORM, UPDATE_FORM, GET_FORM_BY_CATEGORY, MODIFY_FORM_STRUCTURE_VALUES, GET_FORM_BYBREEDER,
    DELETE_FORM, ADD_FORM, DELETE_FORM_ADMIN, MODIFY_FORM_STRUCTURE_VALUES_GET,
    MODIFY_FORM_STRUCTURE_VALUES_ADD,
    DELETE_FORM_REQUEST_FORMSTRUCTURE, DELETE_FORM_REQUEST
} from '../types';
import { baseUrl } from '../../config/globalConfig';
import Cookies from "universal-cookie";
const cookies = new Cookies();
axios.defaults.headers['auth'] = localStorage.getItem('w_auth');


export function getAllForms() {
    const response = axios.get(`${baseUrl}/form`, { headers: { auth: localStorage.getItem('w_auth') } }).then(res => res.data);
    return {
        type: GET_FORM,
        payload: response,
    }
}


export function addForm(data) {
    const response = axios.post(`${baseUrl}/form`, data, { headers: { auth: localStorage.getItem('w_auth') } }).then(res => res.data);
    return {
        type: ADD_FORM,
        payload: response,
    }
}

export function getForms(type = null) {
    const response = axios.get(`${baseUrl}/form/all/forms?type=${type}`, { headers: { auth: localStorage.getItem('w_auth') } }).then(res => res.data);
    return {
        type: GET_FORM,
        payload: response,
    }
}

export function getFormsByBreederAndCategoryType(type) {
    const response = axios.get(`${baseUrl}/form/byBreeder?type=${type}`, { headers: { auth: localStorage.getItem('w_auth') } }).then(res => res.data);
    return {
        type: GET_FORM_BYBREEDER,
        payload: response,
    }
}


export function modifyFormStructureValues(data) {
    const response = axios.put(`${baseUrl}/form/modify/values`, data, { headers: { auth: localStorage.getItem('w_auth') } }).then(res => res.data);
    return {
        type: MODIFY_FORM_STRUCTURE_VALUES,
        payload: response,
    }
}

export function modifyFormStructureValuesAdd(data) {
    const response = axios.put(`${baseUrl}/form/addItemField/values`, data, { headers: { auth: localStorage.getItem('w_auth') } }).then(res => res.data);
    return {
        type: MODIFY_FORM_STRUCTURE_VALUES_ADD,
        payload: response,
    }
}

export function modifyFormStructureValuesGet() {
    const response = axios.get(`${baseUrl}/form/modify/values`, { headers: { auth: localStorage.getItem('w_auth') } }).then(res => res.data);
    return {
        type: MODIFY_FORM_STRUCTURE_VALUES_GET,
        payload: response,
    }
}


export function getFormByCategory(catId) {
    const response = axios.get(`${baseUrl}/form/category/${catId}`, { headers: { auth: localStorage.getItem('w_auth') } }).then(res => res.data);
    return {
        type: GET_FORM_BY_CATEGORY,
        payload: response,
    }
}



export function updateForm(id, data) {
    const response = axios.put(`${baseUrl}/form/${id}`, data, { headers: { auth: localStorage.getItem('w_auth') } }).then(res => res.data);
    return {
        type: UPDATE_FORM,
        payload: response,
    }
}


export function deleteForm(formId, categoryId) {
    const response = axios.delete(`${baseUrl}/form/category/${categoryId}/${formId}`, { headers: { auth: localStorage.getItem('w_auth') } }).then(res => res.data);
    return {
        type: DELETE_FORM,
        payload: response,
    }
}

export function deleteRequestFormStructureIds(data) {
    const response = axios.post(`${baseUrl}/form/addItemField/values`, data, { headers: { auth: localStorage.getItem('w_auth') } }).then(res => res.data);
    return {
        type: DELETE_FORM_REQUEST_FORMSTRUCTURE,
        payload: response,
    }
}

export function deleteFormIdRequest(id) {
    const response = axios.delete(`${baseUrl}/form/addItemFieldFormId/${id}`, { headers: { auth: localStorage.getItem('w_auth') } }).then(res => res.data);
    return {
        type: DELETE_FORM_REQUEST,
        payload: response,
    }
}

export function deleteFormAdmin(categoryId, formId) {
    const response = axios.delete(`${baseUrl}/form/category/${categoryId}/${formId}`, { headers: { auth: localStorage.getItem('w_auth') } }).then(res => res.data);
    return {
        type: DELETE_FORM_ADMIN,
        payload: response,
    }
}

export function excludeBreederFromForm(form, breederId) {
    console.log(form);
    console.log({ ...form, ...{ breedersId: form.breedersId.filter(bf => !(bf._id === breederId)), formStructure: form.formStructure.map(fm => ({ ...fm, ...{ breedersId: fm.breedersId.filter(fbf => !(fbf._id === breederId)) } })) } });
    return { ...form, ...{ breedersId: form.breedersId.filter(bf => !(bf === breederId)), formStructure: form.formStructure.map(fm => ({ ...fm, ...{ breedersId: fm.breedersId.filter(fbf => !(fbf._id === breederId)) } })) } }
}