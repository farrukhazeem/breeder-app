import axios from "axios";
import { ADD_PACKAGE } from "../types";
import Cookies from "universal-cookie";
import { baseUrl } from "../../config/globalConfig";


//admin
export function addPackage(data) {
  const request = axios.post(`${baseUrl}/product`, data,  { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

  return {
    type: ADD_PACKAGE,
    payload: request,
  };
}

