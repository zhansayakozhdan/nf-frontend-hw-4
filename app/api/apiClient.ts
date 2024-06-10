import axios from "axios";
import { toast } from "react-toastify";

const PRODUCTS_API_URL = 'https://fakestoreapi.com';

const IMAGES_API_URL = 'https://api.escuelajs.co/api/v1';

//чтобы не нужно было прописывать один и тот же url
const productsApiAxiosInstance = axios.create({
    baseURL: PRODUCTS_API_URL,
    //headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
})

productsApiAxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; 
    }, 
    (error) => {
        return Promise.reject(error);
    }
)

productsApiAxiosInstance.interceptors.response.use(
    (res) => {
        console.log('Response:', res);
        toast.success("Response successfully received!")
        // if (response.data) {
        //   response.data.receivedAt = Date.now();
        // }

        return res;
    },
    (err) => {
        if (err.response && err.response.status === 401) {
            toast.error('Authentication Error: Please login again.');
        }
        
        if (err.response) {
            const errorMessage = err.response.data.message || 'An error occurred';
            toast.error(errorMessage);
        } else {
            toast.error('An unexpected error occurred.'); 
        }
        
        console.error('Response Error:', err);
        return Promise.reject(err);
    }
);

const imagesApiAxiosInstance = axios.create({
    baseURL: IMAGES_API_URL,
})

imagesApiAxiosInstance.interceptors.response.use(
    (res) => {
        console.log('Response:', res);
        toast.success("Response successfully received!")
        // if (response.data) {
        //   response.data.receivedAt = Date.now();
        // }

        return res;
    },
    (err) => {
        if (err.response && err.response.status === 401) {
            toast.error('Authentication Error: Please login again.');
        }
        
        if (err.response) {
            const errorMessage = err.response.data.message || 'An error occurred';
            toast.error(errorMessage);
        } else {
            toast.error('An unexpected error occurred.'); 
        }
        
        console.error('Response Error:', err);
        return Promise.reject(err);
    }
);

export  {
    productsApiAxiosInstance, imagesApiAxiosInstance
};