import axios from 'axios';

const URL = import.meta.env.VITE_BASE_URL;

export const API_INSTANCE = axios.create({
    baseURL: URL,
});

API_INSTANCE.interceptors.request.use(config => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
