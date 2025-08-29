import axios from 'axios';

//base_url
const BASE_URL='http://localhost:3000/api'

const api=axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type':'application/json'
    },
})


//token management
export const getToken=()=>localStorage.getItem('token');
export const setToken=(token)=>localStorage.setItem('token',token);
export const removeToken=()=>localStorage.removeItem('token')

//interceptor
api.interceptors.request.use(
    (config)=>{
        console.log("request send",config.url)
        const token=getToken();

        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }

        return config;
    },
    (error)=>Promise.reject(error)
);

//response interceptors.response.use
api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.status===401){
            removeToken();
            window.location.href='/login'
        }
        return Promise.reject(error);
    }
)
export default api;