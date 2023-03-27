import axios from 'axios';
import applyCookieHeader from './applyCookieHeader';

const urlProd = 'https://api.vtex.com/applojausereserva';
const urlDev = 'https://api.vtex.com/applojausereserva';

const url = process.env.NODE_ENV === 'production' ? urlProd : urlDev;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const profileInstance = axios.create({
  baseURL: url,
  timeout: 30000,
  headers,
});

profileInstance.interceptors.request.use((config) => applyCookieHeader(config));

export { profileInstance };
