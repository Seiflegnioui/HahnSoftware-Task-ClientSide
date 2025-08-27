import axios from "axios";
import {PORT} from "../evn"
export const axiosClient = axios.create({
    baseURL:`http://localhost:${PORT}/`
})

 axiosClient.interceptors.request.use((config)=>{
        config.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`
        return config
    } , (config)=> {
        return config
    })
