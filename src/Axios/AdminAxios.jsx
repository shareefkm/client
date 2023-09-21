import axios from "axios";

import { ADMIN_API } from "../Constants/API";
import { Store } from "../Redux/Store";

// Create instance
const adminInstance = axios.create({
    baseURL:ADMIN_API,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor
adminInstance.interceptors.request.use(
    config => {
        const adminState = Store.getState().admin;
        config.headers['authorization'] = `Bearer ${adminState.token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default adminInstance
