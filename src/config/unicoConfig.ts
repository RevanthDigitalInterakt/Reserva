import axios from 'axios';

const urlProd = 'https://www.unicocallback.com.br/';

const url = urlProd;

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
};

const instance = axios.create({
    baseURL: url,
    timeout: 30000,
    headers: headers,
});

export { instance, url };
