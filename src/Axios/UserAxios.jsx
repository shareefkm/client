import axios from "axios"
import { USER_API } from "../Constants/API"
import { Store } from "../Redux/Store"

// Create instance
const userInstance = axios.create({
    baseURL:USER_API,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor
userInstance.interceptors.request.use(
    config => {
        const userState = Store.getState().user;
        config.headers['authorization'] = `Bearer ${userState.token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default userInstance
