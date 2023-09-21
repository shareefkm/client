import axios from "axios";

import { RESTAURANT_API } from "../Constants/API";

const restarantInstance = axios.create({
    baseURL:RESTAURANT_API,
})

export default restarantInstance