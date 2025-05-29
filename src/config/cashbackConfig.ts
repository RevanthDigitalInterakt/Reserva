import axios from 'axios';

const urlProd = 'https://api.opencashback.com.br/v1';
const urlDev = 'https://api.opencashback.com.br/v1';

const url = process.env.NODE_ENV === 'production' ? urlProd : urlDev;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-API-KEY': '9219ba22-bc04-4a31-a0e2-aba90451127e',
};

const cashbackInstance = axios.create({
  baseURL: url,
  timeout: 30000,
  headers,
});

export { cashbackInstance };
