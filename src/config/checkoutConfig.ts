import axios from 'axios';

const  x_vtex_api_appKey = 'vtexappkey-lojausereserva-RDYVNZ'
const x_vtex_api_appToken = 'ZSKHFVQZPZDLDGWDNFVSZKBPPMZCEHOGGIJRYBQMXNLVEQCOMJRGHDUOQUSSVNUHLXEVWEFLOJUMZGKYKKQVQHYDNUADIYQJSDJHLHSHEGSXIHPKKUIKXYREYBHBDBCQ'

const checkoutUrl = 'https://www.usereserva.com/api/checkout'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-vtex-api-appKey': x_vtex_api_appKey,
  'x-vtex-api-appToken': x_vtex_api_appToken,
}

const checkoutInstance = axios.create({
  baseURL: checkoutUrl,
  timeout: 30000,
  headers,
})
export { checkoutInstance }
