import { creditsInstance } from '../../../config/creditsConfig';
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
export type AcceptLoyaltyResponse = {
  result: boolean;
};

export type GetDigitalWalletResponse = {
  data: {
    balance_in_cents: number;
    pending_balance_in_cents: number;
    balance_expires_on: string;
    user_status: string;
  };
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
  GetDigitalWallet = '/digital-wallets/',
  GetToken = '/users/',
}

export const MyCreditsAPI = new HttpService(creditsInstance);
