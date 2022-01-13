import { message } from 'antd';
import axios from 'axios';
message.config({ maxCount: 1 });



axios.interceptors.response.use(res => res.status !== 202 ? res : res, error => {
    console.log('in error');

    const expectedError = error.response &&
        error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        console.log("Error", error); //Network Error
        // alert(error);
        message.error(error);
    }
    if (expectedError) {
        //alert(error)
        //message.error("Error");

    }
    return Promise.reject(error);
})

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
}