import axios from "axios";
import { baseUrl } from "../../config/globalConfig";
import {
    ADD_SALE, CHANGE_PAID_STATUS, DASHBOARDSALE, ALLSALEBYSELLER, SALEGRAPHDATA, GET_INVOICE_BY_SELLER_ID, GET_SALE, GET_SALE_BY_ID, GET_SALE_STATICS_BY_USER, SOFTREMOVEINVOICE, PAYINSTALLMENT,
    INVOICE_REMINDER
} from '../types';


import Cookies from "universal-cookie";
const cookies = new Cookies();
axios.defaults.headers['auth'] = localStorage.getItem('w_auth');


export function addSales(dataToSubmit) {
    const request = axios
        .post(`${baseUrl}/sale/saleAnimal`, dataToSubmit, { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: ADD_SALE,
        payload: request,
    };
}

export function getBreederSaleList(buyerId) {
    const request = axios
        .get(`${baseUrl}/sale/breederSalesList/${buyerId}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: GET_SALE,
        payload: request,
    };
}


export function getSale(type, time = "all", startDate = null, endDate = null) {
    const request = axios
        .get(`${baseUrl}/sale?type=${type}&time=${time}&startDate=${startDate}&endDate=${endDate}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: GET_SALE,
        payload: request,
    };
}

export function getSaleById(id) {
    const request = axios
        .get(`${baseUrl}/sale/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: GET_SALE_BY_ID,
        payload: request,
    };
}

export function changePaidStatus(id, isPaid) {
    const request = axios
        .put(`${baseUrl}/sale/changePaidStatus/${id}`, { isPaid }, { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: CHANGE_PAID_STATUS,
        payload: request,
    };
}


export function getSaleStaticsByUser(sellerId, breederId, type = "breeder") {
    console.log(sellerId);
    console.log(breederId);
    const request = axios
        .get(`${baseUrl}/sale/user/${sellerId}/${breederId}?type=${type}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: GET_SALE_STATICS_BY_USER,
        payload: request,
    };
}


export function getInvoiceBySellerId(sellerId) {
    const request = axios
        .get(`${baseUrl}/invoice/seller/${sellerId}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: GET_INVOICE_BY_SELLER_ID,
        payload: request,
    };
}


export function softRemoveInvoice(id) {
    const request = axios
        .delete(`${baseUrl}/invoice/softremove/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: SOFTREMOVEINVOICE,
        payload: request,
    };
}


export function payInstallment(id, saleId, type = "installment") {
    const request = axios
        .put(`${baseUrl}/installment/pay/${id}?type=${type}&saleId=${saleId}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: PAYINSTALLMENT,
        payload: request,
    };
}


export function graphData(breederId, type, start, end) {
    const request = axios
        .get(`${baseUrl}/sale/graphdata/${breederId}?type=${type}&startDate=${start}&endDate=${end}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: SALEGRAPHDATA,
        payload: request,
    };
}

export function dashbaoardSale(breederId, type = "animal") {
    const request = axios
        .get(`${baseUrl}/sale/dashboardSale/${breederId}?type=${type}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: DASHBOARDSALE,
        payload: request,
    };
}



export function allSaleBySeller(sellerId) {
    const request = axios
        .get(`${baseUrl}/sale/allSale/${sellerId}`, { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: ALLSALEBYSELLER,
        payload: request,
    };
}




export function invoiceReminderEmail(data) {
    const request = axios
        .post(`${baseUrl}/invoice/invoiceReminderEmail`, data, { headers: { auth: localStorage.getItem('w_auth') } })
        .then((response) => response.data);

    return {
        type: INVOICE_REMINDER,
        payload: request,
    };
}
