import { cashbackInstance } from '../../../config/cashbackConfig';
import { HttpService } from '../../../shared/services/HttpService';

export type GetCustomerResponse = {
  Documento: string;
  SaldoMonetario: number;
  SaldoMonetarioEmProcessamento: number;
  Fidelizado: boolean;
  Result: boolean;
  Message: string;
  IsException: boolean;
};

export type GetTokenResponse = {
  data: {
    token: string;
  };
};

export enum CashbackHttpUrl {
  GetCustomer = '/loyalty/customer',
  AcceptLoyalty = '/loyalty/accept-loyalty',
  ModifyToken = '/loyalty/modify-token',
  GetToken = '/users/',
}

export const MyCashbackAPI = new HttpService(cashbackInstance);
