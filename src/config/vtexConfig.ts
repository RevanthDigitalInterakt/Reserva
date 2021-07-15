import axios from 'axios';

const urlBase = 'https://applojausereserva.vtexcommercestable.com.br/api/';

const urlBase2 = 'https://lojausereserva.vtexcommercestable.com.br/api/';

const url = urlBase;

const AppKey = 'vtexappkey-lojausereserva-SJLOOC';
const AppToken =
  'HNTVHRYYICABKZUFEXCSBIZQFUWLUBRQSBWKNCBDDQKCZCZGGGCNHGMYNDPNUNDHKJJJCKRBVZPKXWQDUQFOYEILOXWKNOJPMDRPTQEWPBRIRBBQMMSEIPIGBXUFNGOH';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-VTEX-API-APPKEY': AppKey,
  'X-VTEX-API-APPTOKEN': AppToken,
};

const instance = axios.create({
  baseURL: url,
  timeout: 30000,
  headers: headers,
});

const instance2 = axios.create({
  baseURL: urlBase2,
  timeout: 30000,
  headers: headers,
});

export { instance, url, urlBase, instance2 };
