import axios from 'axios';
import Config from 'react-native-config';

export const configs = {
  platform_api_key: Config.DITO_PLATFORM_API_KEY,
  sha1_signature: Config.DITO_SHA1_SIGNATURE,
  id_type: 'id',
  network_name: 'pt',
};

const headers = {
  accept: 'application/json',
  Accept: 'application/json;charset=utf-8',
  'Content-Type': 'application/json;charset=utf-8',
};

export const ditoUsersApi = axios.create({
  baseURL: 'https://login.plataformasocial.com.br',
  headers,
});

export const ditoEventsApi = axios.create({
  baseURL: 'https://events.plataformasocial.com.br',
  headers,
});

export const ditoNotificationsApi = axios.create({
  baseURL: 'https://notification.plataformasocial.com.br',
  headers,
});
