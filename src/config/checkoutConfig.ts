import axios from 'axios';

const vtexApiAppKey = 'vtexappkey-lojausereserva-RDYVNZ';
const vtexApiAppToken = 'ZSKHFVQZPZDLDGWDNFVSZKBPPMZCEHOGGIJRYBQMXNLVEQCOMJRGHDUOQUSSVNUHLXEVWEFLOJUMZGKYKKQVQHYDNUADIYQJSDJHLHSHEGSXIHPKKUIKXYREYBHBDBCQ';

const checkoutUrl = 'https://www.usereserva.com/api/checkout';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-vtex-api-appKey': vtexApiAppKey,
  'x-vtex-api-appToken': vtexApiAppToken,
};

const checkoutInstance = axios.create({
  baseURL: checkoutUrl,
  timeout: 30000,
  headers,
});
export { checkoutInstance };
