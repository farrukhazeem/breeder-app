import axios from 'axios';
import {
    CREATE_FEEDBACK, DELETE_FEEDBACK, GET_FEEDBACKS, GET_FEEDBACK
} from '../types';
import { baseUrl } from '../../config/globalConfig';
import Cookies from "universal-cookie";
const cookies = new Cookies();
axios.defaults.headers["auth"] = cookies.get("w_auth");


export function createFeedback(data) {
    const request = axios.post(`${baseUrl}/feedback`, data)
        .then(response => response.data);

    return {
        type: CREATE_FEEDBACK,
        payload: request
    }
}


export function deleteFeedback(id) {
    const request = axios.delete(`${baseUrl}/feedback/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: DELETE_FEEDBACK,
        payload: request
    }
}


export function getFeedback(id) {
    const request = axios.get(`${baseUrl}/feedback/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_FEEDBACK,
        payload: request
    }
}




export function getFeedbacks() {
    const request = axios.get(`${baseUrl}/feedback`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_FEEDBACKS,
        payload: request
    }
}
