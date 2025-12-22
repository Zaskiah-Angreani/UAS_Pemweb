import axios from 'axios';

const api = axios.create({
    // Pastikan ada folder /api di akhir URL ini
    baseURL: 'https://uasbackend-production-ae20.up.railway.app/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;