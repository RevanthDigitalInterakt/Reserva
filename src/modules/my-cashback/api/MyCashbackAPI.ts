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

export type UserOperations = {
  type: string;
  status: string;
  external_order_id: string;
  external_order_amount_in_cents: number;
  cashback_amount_in_cents: number;
  applied_balance_in_cents: number;
  current_balance_in_cents: number;
  requested_cashback: boolean;
  settlement_date: string;
  created_at: string;
};

export type GetUserOperationsResponse = {
  pagination: {
    total_pages: number;
  };
  data: UserOperations[];
};

export type GetTokenResponse = {
  data: {
    token: string;
  };
};

export type ExpireBalance = {
  expire_cashback_amount: string;
  expire_days: number;
  expire_at: string;
  expire_cashback_program_ref_id: string;
  expire_operation_id: number;
  expire_status: string;
  expire_order_id: string;
};

export type GetExpireBalanceResponse = {
  pagination: {
    total_pages: number;
  };
  data: {
    cashbackToExpireData: ExpireBalance[];
    totalExpireBalanceInCents: string;
  };
};

export enum CashbackHttpUrl {
  GetCustomer = '/loyalty/customer',
  AcceptLoyalty = '/loyalty/accept-loyalty',
  ModifyToken = '/loyalty/modify-token',
  GetDigitalWallet = '/digital-wallets/',
  GetToken = '/users/',
  GetUserOperations = '/users/',
  GetExpireBalance = '/cashback-expirations/',
}

export const MyCashbackAPI = new HttpService(cashbackInstance);
