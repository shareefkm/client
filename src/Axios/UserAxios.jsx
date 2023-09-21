import axios from "axios"
import { USER_API } from "../Constants/API"
// import { setCredentials } from "../Redux/Auth/UserSlice"

const userInstance = axios.create({
    baseURL:USER_API,
    // credentials:'include'
})

export default userInstance
