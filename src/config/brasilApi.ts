import axios from 'axios';

export interface CepResponse {
  cep: string,
  state: string,
  city: string,
  neighborhood: string,
  street: string,
  errors?: any
}

const brasilApi = axios.create({
  baseURL: 'https://brasilapi.com.br/api/',

});

export { brasilApi };
