import axios from "axios";
import Swal from "sweetalert2";

export const API_URL = import.meta.env.VITE_BASE_URL;

const apiInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
})

apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {


        if (error.response && error.response.status === 401) {
            localStorage.clear();
            Swal.fire("Error", "Unauthorized access. Please Login", "error");
        } else {
            Swal.fire("Error", error.response.data.status.message, "error");
        }
        return Promise.reject(error);
    }
)

export default apiInstance;