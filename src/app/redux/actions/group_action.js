import axios from 'axios';
import {
    CREATE_GROUP, UPDATE_GROUP, DELETE_GROUP, GET_GROUP, GET_GROUPS,
    CREATE_GROUP_LOG, UPDATE_GROUP_LOG, DELETE_GROUP_LOG, GET_GROUP_LOG, GET_GROUP_LOGS
} from '../types';

import Cookies from "universal-cookie";
import { baseUrl } from "../../config/globalConfig";
const cookies = new Cookies();
axios.defaults.headers["auth"] = cookies.get("w_auth");

export function createGroup(data) {
    const request = axios.post(`${baseUrl}/group`, data,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: CREATE_GROUP,
        payload: request
    }
}


export function updateGroup(id, data) {
    const request = axios.patch(`${baseUrl}/group/${id}`, data,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: UPDATE_GROUP,
        payload: request
    }
}



export function deleteGroup(id) {
    const request = axios.delete(`${baseUrl}/group/${id}`,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: DELETE_GROUP,
        payload: request
    }
}


export function getGroup(id) {
    const request = axios.get(`${baseUrl}/group/${id}`,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_GROUP,
        payload: request
    }
}



//specific to breeder
export function getAllGroups() {
    const request = axios.get(`${baseUrl}/group`,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_GROUPS,
        payload: request
    }
}


///GroupLog
export function createGroupLog(data) {
    const request = axios.post(`${baseUrl}/grouplog`, data,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: CREATE_GROUP_LOG,
        payload: request
    }
}


export function updateGroupLog(id, data) {
    const request = axios.patch(`${baseUrl}/grouplog/${id}`, data,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: UPDATE_GROUP_LOG,
        payload: request
    }
}



export function deleteGroupLog(id) {
    const request = axios.delete(`${baseUrl}/grouplog/${id}`,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: DELETE_GROUP_LOG,
        payload: request
    }
}


export function getGroupLog(id) {
    const request = axios.get(`${baseUrl}/grouplog/${id}`,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_GROUP_LOG,
        payload: request
    }
}




export function getGroupLogs() {
    const request = axios.get(`${baseUrl}/grouplog`,  { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_GROUP_LOGS,
        payload: request
    }
}
