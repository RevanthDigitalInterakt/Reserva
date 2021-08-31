import axios from 'axios';

const urlBase = 'https://app-vtex.usereserva.com/api/';

const urlBase2 = 'https://lojausereserva.myvtex.com/api/';

const urlUser = 'https://www.usereserva.com/';

const sendEmail = 'https://reservapto.com.br/recapi/v2/'

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


export { instance, url, urlBase, instance2, instance3, instance4 };
