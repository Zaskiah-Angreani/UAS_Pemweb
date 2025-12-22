import axios from 'axios';

// Mengambil URL dari .env yang tadi kita buat
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
    baseURL: API_URL,
});

export default api;