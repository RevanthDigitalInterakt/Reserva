import type { AxiosResponse } from 'axios';

import { cashbackInstance } from '../config/cashbackConfig';

export type GetCostumerResponse = {
  Documento: string;
  SaldoMonetario: number;
  SaldoMonetarioEmProcessamento: number;
  Fidelizado: boolean;
  Result: boolean;
  Message: string;
  IsException: boolean;
};

export const cashbackService = {
  getToken: async (
    cpf: string,
    installationToken: string,
  ): Promise<
  AxiosResponse<{ token: string; result: boolean; cashback: number }>
  > => cashbackInstance.post('/loyalty/modify-token', {
    cpf,
    installationToken,
  }),

  acceptLoyalty: async (
    cpf: string,
  ): Promise<AxiosResponse<{ result: boolean }>> => cashbackInstance.post('/loyalty/accept-loyalty', {
    cpf,
  }),

  getCustomer: async (
    cpf: string,
  ): Promise<AxiosResponse<GetCostumerResponse>> => cashbackInstance.get('/loyalty/customer', {
    params: {
      cpf,
    },
  }),
};
