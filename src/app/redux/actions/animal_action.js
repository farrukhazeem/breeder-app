import axios from "axios";
import {
  GET_ALL_ANIMALS,
  DELETE_ALL_ANIMALS,
  CREATE_ANIMAL,
  UPDATE_ANIMAL,
  DELETE_ANIMAL,
  GET_ANIMAL,
  GET_ANIMALS,
  TRANSFER_ANIMAL,
  ADD_AS_PARENT_CHILD, DELETE_CHILD_DATA,
  FILTER_ANIMALS, GET_HEALTH_RECORD, DELETE_GALLERY_IMAGES, UPDATE_ANIMAL_DATA, GET_QR_CODE_OF_ANIMAL, DELETE_HEALTH_RECORD, DELETE_PARENT_DATA,
  ANIMAL_HEALTH_RECORD
} from "../types";
import Cookies from "universal-cookie";
import { baseUrl } from "../../config/globalConfig";
const cookies = new Cookies();
axios.defaults.headers["auth"] = cookies.get("w_auth");

//admin
export function getAnimalall() {
  const request = axios.get(`${baseUrl}/animal/all`, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

  return {
    type: GET_ALL_ANIMALS,
    payload: request,
  };
}

//admin
export function deleteAnimalall() {
  const request = axios.delete(`/animal/all`, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

  return {
    type: DELETE_ALL_ANIMALS,
    payload: request,
  };
}

//animals of breeder specific
export function getAnimals(activationType = "Active", featured = false,) {
  const request = axios.get(`${baseUrl}/animal?activationType=${activationType}${featured ? `&featured=${featured}` : ``}`, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

  return {
    type: GET_ANIMALS,
    payload: request,
  };
}

export function getAnimal(id) {
  const request = axios.get(`${baseUrl}/animal/${id}`, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

  return {
    type: GET_ANIMAL,
    payload: request,
  };
}

// /:id/parent/:parentName

export function deleteParent(id, parentName) {
  const request = axios.delete(`${baseUrl}/animal/${id}/parent/${parentName}`, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

  return {
    type: DELETE_PARENT_DATA,
    payload: request,
  };
}



export function deleteChild(id, childId) {
  const request = axios.delete(`${baseUrl}/animal/${id}/child/${childId}`, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

  return {
    type: DELETE_CHILD_DATA,
    payload: request,
  };
}

export function addAsParentChild(data) {
  const request = axios.put(`${baseUrl}/animal/addasparentchild`, data, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

  return {
    type: ADD_AS_PARENT_CHILD,
    payload: request,
  };
}


export function updateAnimal(data, animalId) {
  const request = axios
    .patch(`${baseUrl}/animal/${animalId}`, data, { headers: { auth: localStorage.getItem('w_auth') } })
    .then((response) => response.data);

  return {
    type: UPDATE_ANIMAL,
    payload: request,
  };
}


export function deleteHealthRecordOfAnimal(animalId, healthRecordId) {
  const request = axios
    .delete(`${baseUrl}/animal/${animalId}/healthrecord/${healthRecordId}`, { headers: { auth: localStorage.getItem('w_auth') } })
    .then((response) => response.data);

  return {
    type: DELETE_HEALTH_RECORD,
    payload: request,
  };
}

export function addHealthRecordOfAnimal(data) {
  const request = axios
    .post(`${baseUrl}/animal/healthrecord/upload`, data, { headers: { auth: localStorage.getItem('w_auth') } })
    .then((response) => response.data);

  return {
    type: ANIMAL_HEALTH_RECORD,
    payload: request,
  };
}

export function deleteAnimal(id) {

  console.log(`${baseUrl}/animal/${id}`);
  const request = axios
    .delete(`${baseUrl}/animal/${id}`, { headers: { auth: localStorage.getItem('w_auth') } })
    .then((response) => response.data);

  return {
    type: DELETE_ANIMAL,
    payload: request,
  };
}

export function createAnimal(data) {
  const request = axios.post(`${baseUrl}/animal`, data, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);

  return {
    type: CREATE_ANIMAL,
    payload: request,
  };
}

export function filterAnimal(name, acquired, categoryName, price, date) {
  const request = axios
    .get(
      `/animal?name=${name}&acquired=${acquired}&categoryName=${categoryName}&price=${price}&date=${date}`,
      { headers: { auth: localStorage.getItem('w_auth') } }
    )
    .then((response) => response.data);

  return {
    type: FILTER_ANIMALS,
    payload: request,
  };
}


export function updateAnimalData(data, animalId) {
  const request = axios
    .put(`${baseUrl}/animal/update/${animalId}`, data, { headers: { auth: localStorage.getItem('w_auth') } })
    .then((response) => response.data);

  return {
    type: UPDATE_ANIMAL_DATA,
    payload: request,
  };
}


export function getHealthRecord(id) {
  const request = axios.get(`${baseUrl}/animal/healthrecord/${id}`, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);


  return {
    type: GET_HEALTH_RECORD,
    payload: request,
  };
}


export function getQRCodeOfAnimal(id) {
  const request = axios.get(`${baseUrl}/animal/qrcode/${id}`, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);
  return {
    type: GET_QR_CODE_OF_ANIMAL,
    payload: request,
  };
}

export function deleteGalleryImages(data) {
  const request = axios.put(`${baseUrl}/animal/gallery/delete`, data, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);


  return {
    type: DELETE_GALLERY_IMAGES,
    payload: request,
  };
}


export function transferAnimal(data) {
  const request = axios.post(`${baseUrl}/animal/transferanimal`, data, { headers: { auth: localStorage.getItem('w_auth') } }).then((response) => response.data);


  return {
    type: TRANSFER_ANIMAL,
    payload: request,
  };
}
