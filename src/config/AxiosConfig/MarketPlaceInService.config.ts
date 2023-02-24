import Config from 'react-native-config';
import axios from 'axios';
import applyCookieHeader from '../applyCookieHeader';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-VTEX-API-APPKEY': Config.APP_KEY,
  'X-VTEX-API-APPTOKEN': Config.APP_TOKEN,
};

const ServiceMakertPlaceIn = axios.create({
  baseURL: Config.URL_BASE_MARKETPLACE_IN,
  timeout: 30000,
  headers,
});

ServiceMakertPlaceIn.interceptors.request.use((config) => applyCookieHeader(config));
export { ServiceMakertPlaceIn };
