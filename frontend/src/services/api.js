import axios from 'axios';

// Toma la URL de la variable de entorno de Vite o usa el valor por defecto de desarrollo
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7285/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para inyectar automáticamente el token JWT si está disponible
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
