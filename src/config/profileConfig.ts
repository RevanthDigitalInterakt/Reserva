import axios from 'axios';

const urlProd = 'https://api.vtex.com/applojausereserva';
const urlDev = 'https://api.vtex.com/applojausereserva';

const url = process.env.NODE_ENV === 'production' ? urlProd : urlDev;

const AppKey = 'vtexappkey-lojausereserva-SJLOOC';
const AppToken =
  'HNTVHRYYICABKZUFEXCSBIZQFUWLUBRQSBWKNCBDDQKCZCZGGGCNHGMYNDPNUNDHKJJJCKRBVZPKXWQDUQFOYEILOXWKNOJPMDRPTQEWPBRIRBBQMMSEIPIGBXUFNGOH';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-VTEX-API-APPKEY': AppKey,
  'X-VTEX-API-APPTOKEN': AppToken,
};

const profileInstance = axios.create({
  baseURL: url,
  timeout: 30000,
  headers,
});

export { profileInstance };
