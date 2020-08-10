import axios from 'axios';

const hostName = 'http://172.20.10.7';
const port = '3333';
const host = `${hostName}:${port}`;

const api = axios.create({
  baseURL: host,
});

export default api;
