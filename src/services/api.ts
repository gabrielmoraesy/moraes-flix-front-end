import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
    baseURL: URL,
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
