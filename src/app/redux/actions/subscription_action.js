import axios from 'axios';
import {
    CREATE_SUBSCRIPTION, UPDATE_SUBSCRIPTION, DELETE_SUBSCRIPTIONS, DELETE_SUBSCRIPTION,
    GET_SUBSCRIPTIONS, GET_SUBSCRIPTION,
    GET_SUBSCRIBER, DELETE_SUBSCRIBER, UPDATE_SUBSCRIBER, GET_SUBSCRIBERS, GET_SUBSCRIBED_PACKAGE,
    CREATE_SUBSCRIBER_STRIPE, CREATE_SUBSCRIBER_SIMPLE
} from '../types';
import Cookies from "universal-cookie";
import { baseUrl } from "../../config/globalConfig";
const cookies = new Cookies();
axios.defaults.headers["auth"] = cookies.get("w_auth");



export function createSubscription(dataToSubmit) {
    const request = axios.post(`${baseUrl}/subscription`, dataToSubmit, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: CREATE_SUBSCRIPTION,
        payload: request
    }
}


export function updateSubscription(id, dataToSubmit) {
    const request = axios.patch(`${baseUrl}/subscription/${id}`, dataToSubmit, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: UPDATE_SUBSCRIPTION,
        payload: request
    }
}


export function getSubscribedPackageOfBreeder(id) {
    const request = axios.get(`${baseUrl}/subscriber/getSubscribedPackage/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_SUBSCRIBED_PACKAGE,
        payload: request
    }
}



export function deleteSubscription(id) {
    const request = axios.delete(`${baseUrl}/subscription/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: DELETE_SUBSCRIPTION,
        payload: request
    }
}


export function deleteSubscriptions() {
    const request = axios.delete(`/subscription`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: DELETE_SUBSCRIPTIONS,
        payload: request
    }
}


export function getSubscriptions() {
    const request = axios.get(`${baseUrl}/subscription`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_SUBSCRIPTIONS,
        payload: request
    }
}

export function getSubscription(id) {
    const request = axios.get(`/subscription/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_SUBSCRIPTION,
        payload: request
    }
}

export function getSubscriber(id) {
    const request = axios.get(`/subscriber/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_SUBSCRIBER,
        payload: request
    }
}


export function getSubscribers() {
    const request = axios.get(`/subscriber`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: GET_SUBSCRIBERS,
        payload: request
    }
}


export function deleteSubscriber(id) {
    const request = axios.delete(`/subscriber/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: DELETE_SUBSCRIBER,
        payload: request
    }
}


export function updateSubscriber(id, dataToSubmit) {
    console.log(id, dataToSubmit)
    const request = axios.patch(`${baseUrl}/subscriber/${id}`, dataToSubmit, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: UPDATE_SUBSCRIBER,
        payload: request
    }
}

export function createSubscriberStripe(dataToSubmit) {
    const request = axios.get(`/subscriber/stripe`, dataToSubmit, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: CREATE_SUBSCRIBER_STRIPE,
        payload: request
    }
}


export function createSubscriberSimple(dataToSubmit) {
    const request = axios.post(`${baseUrl}/subscriber`, dataToSubmit, { headers: { auth: localStorage.getItem('w_auth') } })
        .then(response => response.data);

    return {
        type: CREATE_SUBSCRIBER_SIMPLE,
        payload: request
    }
}

