import axios from 'axios';

const urlProd = 'https://bff-cashback.usereserva.com';
const urlDev = 'https://bff-cashback.usereserva.com';

const url = process.env.NODE_ENV === 'production' ? urlProd : urlDev;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const creditsInstance = axios.create({
  baseURL: url,
  timeout: 30000,
  headers,
});

export { creditsInstance };
