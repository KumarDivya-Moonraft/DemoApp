import axios from "axios";
import store from "../store";
import { logout, setToken } from "../store/authReducer";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 20000,
});

axiosInstance.interceptors.request.use((req) => {
    const token = store.getState().auth.authToken;
    req.headers['common'] = {
        authorization: 'Bearer ' + token
    };
    console.log("Inspector req", req);
    return req;
});

axiosInstance.interceptors.response.use((res) => {
    console.log("Inspector res", res);
    return res;
}, async function (error) {
    if (error.response.status === 403) {
        const { refreshToken } = store.getState().auth;
        return await axios.post('http://localhost:3000/token', {
            token: refreshToken
        }).then((res) => {
            store.dispatch(setToken(res.data));
            error.config.headers['authorization']='Bearer ' + res.data.accessToken
            return axiosInstance(error.config);
        }).catch((error) => {
            store.dispatch(logout());
            return Promise.reject(error);
        })
    }
    return Promise.reject(error);
});

export default axiosInstance;