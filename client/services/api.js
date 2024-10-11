import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9000/api', // Base URL for your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
