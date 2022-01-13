import axios from "axios";
import {
  ADD_PRODUCT, DELETE_PRODUCT, GET_PRODUCT, GET_PRODUCT_BY_ID,
  EDIT_PRODUCT, GET_PRODUCT_BY_ID_SHARE
} from "../types";
import Cookies from "universal-cookie";
import { baseUrl } from "../../config/globalConfig";
const cookies = new Cookies();
axios.defaults.headers["auth"] = cookies.get("w_auth");

//admin
export function createProduct(data) {
  const request = axios.post(`${baseUrl}/product`, data, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

  return {
    type: ADD_PRODUCT,
    payload: request,
  };
}


export function editProduct(data, id) {
  const request = axios.put(`${baseUrl}/product/${id}`, data, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

  return {
    type: EDIT_PRODUCT,
    payload: request,
  };
}


//admin
export function getProduct() {
  const request = axios.get(`${baseUrl}/product`, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

  return {
    type: GET_PRODUCT,
    payload: request,
  };
}

export function deleteProduct(id) {
  const request = axios
    .delete(`${baseUrl}/product/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
    .then((response) => response.data);

  return {
    type: DELETE_PRODUCT,
    payload: request,
  };
}

export function getProductById(id) {
  const request = axios
    .get(`${baseUrl}/product/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
    .then((response) => response.data);

  return {
    type: GET_PRODUCT_BY_ID,
    payload: request,
  };
}

export function getProductByIdShare(id) {
  const request = axios
    .get(`${baseUrl}/product/share/${id}`)
    .then((response) => response.data);

  return {
    type: GET_PRODUCT_BY_ID_SHARE,
    payload: request,
  };
}