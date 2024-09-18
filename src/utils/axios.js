import axios from "axios"

let auth = localStorage.getItem('auth');
if (auth == '') location = 'http://localhost:8080/login'; //URL web

const instance = axios.create({
    baseURL: 'http://localhost:5016', //URL API domain
    headers: {Authorization: 'Bearer' + auth}
});

instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.request.use(function (respone) {
    return respone;
}, function (error) {
    return Promise.reject(error);
});

export default instance;