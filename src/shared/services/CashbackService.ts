import type { AxiosInstance, AxiosResponse } from 'axios';
import { cashbackInstance } from '../../config/cashbackConfig';

type GetTokenResponse = {
  token: string;
  result: boolean;
};

type AcceptLoyaltyResponse = {
  result: boolean;
};

export type GetCustomerResponse = {
  Documento: string;
  SaldoMonetario: number;
  SaldoMonetarioEmProcessamento: number;
  Fidelizado: boolean;
  Result: boolean;
  Message: string;
  IsException: boolean;
};

export class CashbackService {
  private http: AxiosInstance = cashbackInstance;

  public async getToken(cpf: string, installationToken: string):
  Promise<AxiosResponse<GetTokenResponse>> {
    const response = await this.http.post<GetTokenResponse>('/loyalty/modify-token', {
      cpf,
      installationToken,
    });
    return response;
  }

  public async acceptLoyalty(cpf: string):
  Promise<AxiosResponse<AcceptLoyaltyResponse>> {
    const response = await this.http.post<AcceptLoyaltyResponse>('/loyalty/accept-loyalty', {
      cpf,
    });
    return response;
  }

  public async getCustomer(cpf: string):
  Promise<AxiosResponse<GetCustomerResponse>> {
    const response = await this.http.get<GetCustomerResponse>('/loyalty/customer', {
      params: {
        cpf,
      },
    });
    return response;
  }
}
