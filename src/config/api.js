import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/oGabrielArruda/fake-api',
});

export default api;
