import axios from 'axios';

const API_ENDPOINT = "https://event.test.bitpod.io/svc/api";

const axiosWrapper = (path) => {
    return axios.get(`${API_ENDPOINT}${path}`)
}

export {
    axiosWrapper
}