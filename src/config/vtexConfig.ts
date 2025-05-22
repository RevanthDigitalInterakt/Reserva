import Config from 'react-native-config';

import axios from 'axios';

import applyCookieHeader from './applyCookieHeader';

const urlBase = Config.URL_BASE;

const urlBase2 = Config.URL_BASE2;

const urlUser = Config.URL_USER;

const sendEmail = Config.URL_SEND_EMAIL;

const url = urlBase;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const instance = axios.create({
  baseURL: url,
  timeout: 30000,
  headers,
});

const instance2 = axios.create({
  baseURL: urlBase2,
  timeout: 30000,
  headers,
});

const instance3 = axios.create({
  baseURL: urlUser,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
const instance4 = axios.create({
  baseURL: sendEmail,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const instance5 = axios.create({
  baseURL: urlBase2,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const instance7 = axios.create({
  baseURL: urlBase,
  timeout: 30000,
  headers,
});

const instance8 = axios.create({
  baseURL: Config.URL_VTEX_QA,
  timeout: 30000,
  headers,
});

instance.interceptors.request.use((config) => applyCookieHeader(config));
instance2.interceptors.request.use((config) => applyCookieHeader(config));
instance3.interceptors.request.use((config) => applyCookieHeader(config));
instance4.interceptors.request.use((config) => applyCookieHeader(config));
instance5.interceptors.request.use((config) => applyCookieHeader(config));
instance7.interceptors.request.use((config) => applyCookieHeader(config));
instance8.interceptors.request.use((config) => applyCookieHeader(config));

export {
  instance,
  url,
  urlBase,
  instance2,
  instance3,
  instance4,
  instance5,
  instance7,
};
