import { AxiosResponse } from "axios";
import { HttpService } from "../../../shared/services/HttpService";
import { cashbackInstance } from "../../../config/cashbackConfig";

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
  token: string;
  result: boolean;
};

export type AcceptLoyaltyResponse = {
  result: boolean;
}

export enum CashbackHttpUrl {
  GetCustomer = "/loyalty/customer",
  AcceptLoyalty = "/loyalty/accept-loyalty",
  ModifyToken = '/loyalty/modify-token',
}

export const MyCreditsAPI = new HttpService(cashbackInstance);
