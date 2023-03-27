import Config from 'react-native-config';
import axios from 'axios';
import applyCookieHeader from '../applyCookieHeader';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const ServiceMakertPlaceIn = axios.create({
  baseURL: Config.URL_BASE_MARKETPLACE_IN,
  timeout: 30000,
  headers,
});

ServiceMakertPlaceIn.interceptors.request.use((config) => applyCookieHeader(config));
export { ServiceMakertPlaceIn };
