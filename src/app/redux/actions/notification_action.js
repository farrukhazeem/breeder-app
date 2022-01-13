import axios from 'axios';
import {
    CREATE_NOTIFICATION, GET_NOTIFICATION, DELETE_NOTIFICATION
} from '../types';
import { baseUrl } from '../../config/globalConfig';

axios.defaults.headers['auth'] = localStorage.getItem('w_auth');


export function createNotification(data) {
    const request = axios.post(`${baseUrl}/notification`, data, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: CREATE_NOTIFICATION,
        payload: request
    }
}


export function deleteNotification(id) {
    const request = axios.delete(`${baseUrl}/notification/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: DELETE_NOTIFICATION,
        payload: request
    }
}


export function getNotification(type) {
    const request = axios.get(`${baseUrl}/notification?type=${type}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_NOTIFICATION,
        payload: request
    }
}


