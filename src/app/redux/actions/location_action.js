import axios from 'axios';
import { baseUrl } from '../../config/globalConfig';
import {
    GET_CITIES, GET_STATES, GET_ZIPCODES,
    CREATE_LOCATION, UPDATE_LOCATION, GET_LOCATION, GET_LOCATIONS, DELETE_LOCATION,
    GET_ALL_LOCATIONS
} from '../types';



export function getCities() {
    const request = axios.get(`${baseUrl}/city/all`)
        .then(response => response.data);

    return {
        type: GET_CITIES,
        payload: request
    }
}

export function getCityByState(state) {
    const request = axios.get(`${baseUrl}/city/all?stateId=${state}`)
        .then(response => response.data);

    return {
        type: GET_CITIES,
        payload: request
    }
}

export function getStates() {
    const request = axios.get(`${baseUrl}/state/all`)
        .then(response => response.data);

    return {
        type: GET_STATES,
        payload: request
    }
}


export function getZipcodes() {
    const request = axios.get(`${baseUrl}/zipcode/all`)
        .then(response => response.data);

    return {
        type: GET_ZIPCODES,
        payload: request
    }
}

///
export function createLocation(data) {
    const request = axios.post(`${baseUrl}/location`, data)
        .then(response => response.data);

    return {
        type: CREATE_LOCATION,
        payload: request
    }
}

export function updateLocation(id, data) {
    const request = axios.post(`${baseUrl}/location/${id}`, data)
        .then(response => response.data);

    return {
        type: UPDATE_LOCATION,
        payload: request
    }
}

export function deleteLocation(id) {
    const request = axios.delete(`${baseUrl}/location/${id}`)
        .then(response => response.data);

    return {
        type: DELETE_LOCATION,
        payload: request
    }
}


export function getLocation(id) {
    const request = axios.get(`${baseUrl}/location/${id}`)
        .then(response => response.data);

    return {
        type: GET_LOCATION,
        payload: request
    }
}

//locations of specific breeders
export function getLocations() {
    const request = axios.get(`${baseUrl}/location`)
        .then(response => response.data);

    return {
        type: GET_LOCATIONS,
        payload: request
    }
}


//admin
export function getAllLocations() {
    const request = axios.get(`${baseUrl}/location/all`)
        .then(response => response.data);

    return {
        type: GET_ALL_LOCATIONS,
        payload: request
    }
}

