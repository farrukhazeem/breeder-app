import axios from "axios";
import { baseUrl } from "../../config/globalConfig";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  CREATE_CARD_CUSTOMER,
  LOGOUT_USER,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILURE,
  PASSWORD_CHANGE_EMP,
  PASSWORD_CHANGE,
  EDIT_USER_DETAIL,
  USER_DETAIL,
  GET_BREEDER_TAX,
  DELETE_DEAL_CATEGORIES,
  ADD_DEAL_CATEGORIES,
  POST_SETUPWIZARD,
  GET_DASHBOARD_ANALYSIS,
  REGISTER_EMP,
  GET_ALL_EMP,

  RESEND_VERIFICATION_EMAIL,
  GET_EMP,
  UPDATE_EMP,
  REMOVE_EMP,
  REMOVE_BREEDER,
  GET_BREEDER_EMPLOYEES,
  GET_ALL_BREEDER,
  DELETE_USER_GALLERY_IMAGES,
  GET_USER_DETAIL_BY_ID,
  GET_ALL_USERS,
  BLOCK_BREEDER,
  DELETE_BREEDER,
  ITEM_COUNT,
  ADMIN_DASHBOARD_STATICS,
} from "../types";

import Cookies from "universal-cookie";
const cookies = new Cookies();
axios.defaults.headers["auth"] = localStorage.getItem("w_auth");

export function getAllUsers(role = "all") {
  const request = axios
    .get(`${baseUrl}/user/allusers?role=${role}`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: GET_ALL_USERS,
    payload: request,
  };
}


export function getAdminDashboardStatics() {
  const request = axios
    .get(`${baseUrl}/user/adminDashboardStatics`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: ADMIN_DASHBOARD_STATICS,
    payload: request,
  };
}

export function getUserDetailById(id) {
  const request = axios
    .get(`${baseUrl}/user/detail/${id}`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: GET_USER_DETAIL_BY_ID,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${baseUrl}/user/breeder/register`, dataToSubmit, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function removeBreeder() {
  const request = axios
    .delete(`${baseUrl}/user`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: REMOVE_BREEDER,
    payload: request,
  };
}

export function registerEmp(dataToSubmit) {
  // const config = {
  //   headers: { 'content-type': 'multipart/form-data' }
  // }
  const request = axios
    .post(`${baseUrl}/user/employee/register`, dataToSubmit, {
      headers: { auth: localStorage.getItem("w_auth") },
    }) //, config)
    .then((response) => response.data);

  return {
    type: REGISTER_EMP,
    payload: request,
  };
}

export function updateEmp(dataToSubmit, id) {
  console.log(dataToSubmit);
  const request = axios
    .put(`${baseUrl}/user/employee/${id}`, dataToSubmit, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: UPDATE_EMP,
    payload: request,
  };
}

export function blockBreeder(dataToSubmit, id) {
  console.log(dataToSubmit);
  const request = axios
    .patch(`${baseUrl}/user/isblocked/${id}`, dataToSubmit, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: BLOCK_BREEDER,
    payload: request,
  };
}

export function getAllEmp() {
  const request = axios
    .get(`${baseUrl}/user/employees/all`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: GET_ALL_EMP,
    payload: request,
  };
}

export function deleteUserGalleryImages(data) {
  const request = axios
    .put(`${baseUrl}/user/gallery/delete`, data, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: DELETE_USER_GALLERY_IMAGES,
    payload: request,
  };
}

// export function uploadImage(name) {
//   const request = axios.put(`${baseUrl}/user//image/${}`, data).then((response) => response.data);

//   return {
//     type: DELETE_USER_GALLERY_IMAGES,
//     payload: request,
//   };
// }

export function addDealCategory(data) {
  const request = axios
    .post(`${baseUrl}/user/dealcategories`, data, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: ADD_DEAL_CATEGORIES,
    payload: request,
  };
}

export function deleteDealCategory(id) {
  const request = axios
    .delete(`${baseUrl}/user/dealcategories/${id}`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: DELETE_DEAL_CATEGORIES,
    payload: request,
  };
}

export function getAllBreeder(keyword = "", uid = "") {
  const request = axios
    .get(`${baseUrl}/user/breeders/all?keyword=${keyword}&uid=${uid}`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: GET_ALL_BREEDER,
    payload: request,
  };
}

export function getBreederEmployees() {
  const request = axios
    .get(`${baseUrl}/user/breeder/employees`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: GET_BREEDER_EMPLOYEES,
    payload: request,
  };
}

export function getTax() {
  const request = axios
    .get(`${baseUrl}/user/breeder/getTax`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: GET_BREEDER_TAX,
    payload: request,
  };
}

export function setupWizard(data) {
  const request = axios
    .post(`${baseUrl}/user/setupwizard`, data, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: POST_SETUPWIZARD,
    payload: request,
  };
}

export function getEmp(id) {
  console.log(id);
  console.log(`${baseUrl}/user/employee/${id}`);
  const request = axios
    .get(`${baseUrl}/user/employee/${id}`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: GET_EMP,
    payload: request,
  };
}

export function removeEmp(id) {
  const request = axios
    .delete(`${baseUrl}/user/employee/${id}`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: REMOVE_EMP,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${baseUrl}/user/login`, dataToSubmit, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${baseUrl}/user/auth`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export async function logoutUser() {
  axios.defaults.headers["auth"] = localStorage.getItem("w_auth");
  if (JSON.parse(localStorage.getItem('user')).isAdmin) {
    const request = await axios
      .get(`${baseUrl}/user/logout`, {
        headers: { auth: localStorage.getItem("w_auth") },
      })
      .then((response) => {
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        localStorage.removeItem("w_auth");
        cookies.remove("w_auth");
        return response.data;
      });
    return {
      type: LOGOUT_USER,
      payload: request,
    };
  }
  else {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("w_auth");
    cookies.remove("w_auth");
    return {
      type: LOGOUT_USER,
      payload: { message: "Logout successfully", status: 200 },
    };
  }
}

export async function forgetPassword(dataToSubmit) {
  //console.log(dataToSubmit);
  const request = await axios.post(
    `${baseUrl}/user/forgetpassword`,
    dataToSubmit,
    { headers: { auth: localStorage.getItem("w_auth") } }
  );
  //console.log(request);
  if (request.data.status === 200) {
    return {
      type: FORGET_PASSWORD_SUCCESS,
      payload: request.data.data,
    };
  } else {
    return {
      type: FORGET_PASSWORD_FAILURE,
      payload: request.data.message,
    };
  }
}

export function passwordChange(passwordstr, dataToSubmit) {
  const request = axios
    .post(`${baseUrl}/user/resetForgotPassword/${passwordstr}`, dataToSubmit, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);
  return {
    type: PASSWORD_CHANGE,
    payload: request,
  };
}

export function empPasswordChange(data) {
  const request = axios
    .post(`${baseUrl}/user/employee/changePassword`, data, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);
  return {
    type: PASSWORD_CHANGE_EMP,
    payload: request,
  };
}

export function userDetail() {
  const request = axios
    .get(`${baseUrl}/user`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: USER_DETAIL,
    payload: request,
  };
}
export function itemCount() {
  const request = axios
    .get(`${baseUrl}/user/itemCount`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: ITEM_COUNT,
    payload: request,
  };
}

export function editDetail(dataToSubmit, type = "") {
  const request = axios
    .put(`${baseUrl}/user?type=${type}`, dataToSubmit, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);
  return {
    type: EDIT_USER_DETAIL,
    payload: request,
  };
}

export function createCardCustomer(dataToSubmit) {
  const request = axios
    .post(`${baseUrl}/user/credit-card`, dataToSubmit, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);
  return {
    type: CREATE_CARD_CUSTOMER,
    payload: request,
  };
}



export function createCardCustomerBusiness(dataToSubmit) {
  const request = axios
    .post(`${baseUrl}/user/creditCardBusiness`, dataToSubmit)
    .then((response) => response.data);
  return {
    type: CREATE_CARD_CUSTOMER,
    payload: request,
  };
}

export function dashbaordAnalysis(type = "animal") {
  const request = axios
    .get(`${baseUrl}/user/dashboardAnalysis?type=${type}`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);
  return {
    type: GET_DASHBOARD_ANALYSIS,
    payload: request,
  };
}

export function getUserId() {
  return localStorage.getItem("userId");
}

export function deleteBreeder(id) {
  const request = axios
    .delete(`${baseUrl}/user/breeder/${id}`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: DELETE_BREEDER,
    payload: request,
  };
}


export function resendEmailBreeder(id) {
  const request = axios
    .post(`${baseUrl}/user/breeder/resendEmail/${id}`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: RESEND_VERIFICATION_EMAIL,
    payload: request,
  };
}

export function approveBreeder(id) {
  const request = axios
    .get(`${baseUrl}/user/approve/breeder/${id}`, {
      headers: { auth: localStorage.getItem("w_auth") },
    })
    .then((response) => response.data);

  return {
    type: DELETE_BREEDER,
    payload: request,
  };
}

// ADMIN SECTION..
