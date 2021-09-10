import axios from 'axios';

const urlBase = 'https://www.unicocallback.com.br/';

const url = urlBase;

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
