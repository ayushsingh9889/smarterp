import axios from 'axios';

const API = axios.create({
  baseURL: 'https://smarterp-backend-d4zp.onrender.com/api'
});

export default API;
