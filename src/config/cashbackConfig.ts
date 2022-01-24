import axios from 'axios';

const urlProd = 'https://opencashback-api.staging.ingress.lemoney.com/v1';
const urlDev = 'https://opencashback-api.staging.ingress.lemoney.com/v1';

const url = process.env.NODE_ENV === 'production' ? urlProd : urlDev;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-API-KEY': '658d42e9-236a-4bfe-8232-9e8fceffb77e',
};

const cashbackInstance = axios.create({
  baseURL: url,
  timeout: 30000,
  headers,
});

export { cashbackInstance };
