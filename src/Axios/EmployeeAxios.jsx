import axios from "axios";
import io from "socket.io-client";

import { EMPLOYEE_API } from "../Constants/API";
import { Store } from "../Redux/Store";

// export const socket = io(EMPLOYEE_API);

const employeeInstance = axios.create({
    baseURL:EMPLOYEE_API,
    headers:{
        'Content-Type': 'application/json'
    }
})

employeeInstance.interceptors.request.use(
    config =>{
        const employeeState = Store.getState().employee
        config.headers['authorization'] = `Bearer ${employeeState.token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default employeeInstance