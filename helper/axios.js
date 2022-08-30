import axios from "axios";

export const BASE_URL ="http://10.103.0.15/cs63/s10/Eletronic/Backend/";

export default axios.create({
    baseURL: BASE_URL,
    headers:{
        "Content-Type" : "multipart/form-data"
    }
})