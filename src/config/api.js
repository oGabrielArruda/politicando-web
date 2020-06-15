import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:44377/api',
});

export default api;
