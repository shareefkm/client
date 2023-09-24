import axios from "axios";
import { Store } from "../Redux/Store";
import { RESTAURANT_API } from "../Constants/API";

// Create instance
const restarantInstance = axios.create({
    baseURL:RESTAURANT_API,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor
restarantInstance.interceptors.request.use(
    config => {
        const restaurantState = Store.getState().restaurant;
        config.headers['authorization'] = `Bearer ${restaurantState.token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default restarantInstance