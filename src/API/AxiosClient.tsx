import axios from "axios";

export const axiosClient = axios.create({
    baseURL:"http://localhost:5155/"
})

 axiosClient.interceptors.request.use((config)=>{
        config.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`
        return config
    } , (config)=> {
        return config
    })
