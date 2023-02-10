import Config from 'react-native-config';

import axios from 'axios';

import applyCookieHeader from './applyCookieHeader';

const urlBase = Config.URL_BASE;

const urlBase2 = Config.URL_BASE2;

const urlBase3 = Config.URL_BASE3;

const urlUser = Config.URL_USER;

const urlDeleteUser = Config.URL_DELETE_USER;

const sendEmail = Config.URL_SEND_EMAIL;

const url = urlBase;

const AppKey = Config.APP_KEY;
const AppToken = Config.APP_TOKEN;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-VTEX-API-APPKEY': AppKey,
  'X-VTEX-API-APPTOKEN': AppToken,
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

const instance6 = axios.create({
  baseURL: urlDeleteUser,
  timeout: 30000,
  headers: {
    'X-VTEX-API-APPKEY': AppKey,
    'X-VTEX-API-APPTOKEN': AppToken,
  },
});

const instance7 = axios.create({
  baseURL: urlBase3,
  timeout: 30000,
  headers,
});

instance.interceptors.request.use((config) => applyCookieHeader(config));
instance2.interceptors.request.use((config) => applyCookieHeader(config));
instance3.interceptors.request.use((config) => applyCookieHeader(config));
instance4.interceptors.request.use((config) => applyCookieHeader(config));
instance5.interceptors.request.use((config) => applyCookieHeader(config));
instance6.interceptors.request.use((config) => applyCookieHeader(config));
instance7.interceptors.request.use((config) => applyCookieHeader(config));

export {
  instance,
  url,
  urlBase,
  instance2,
  instance3,
  instance4,
  instance5,
  instance6,
  instance7,
};
