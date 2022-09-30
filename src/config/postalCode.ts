import axios from 'axios';

export interface CepResponse {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  errors?: any;
}

const postalCode = axios.create({
  baseURL: 'https://www.usereserva.com/api/checkout/pub/postal-code/BRA',
});

export { postalCode };
