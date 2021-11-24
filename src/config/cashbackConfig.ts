import axios from 'axios';

const urlProd = 'https://www.unicocallback.com.br/';
const urlDev = 'http://8aa0-170-246-97-68.ngrok.io';

const url = process.env.NODE_ENV === 'production' ? urlProd : urlDev;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const cashbackInstance = axios.create({
  baseURL: url,
  timeout: 30000,
  headers,
});

export { cashbackInstance, url };
