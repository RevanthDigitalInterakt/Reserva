import axios from 'axios';

const urlBase2 = 'https://lojausereserva.vtexcommercestable.com.br/api/';

const url2 = urlBase2;

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
    baseURL: url2,
    timeout: 30000,
    headers: headers,
});

export { instance as default, url2, urlBase2 };
