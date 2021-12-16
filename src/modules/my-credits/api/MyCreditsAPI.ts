import { AxiosResponse } from "axios";
import { cashbackInstance } from "../../../config/cashbackConfig";

type GetCustomerResponse = {
  Documento: string;
  SaldoMonetario: number;
  SaldoMonetarioEmProcessamento: number;
  Fidelizado: boolean;
  Result: boolean;
  Message: string;
  IsException: boolean;
};

export const createRequestGetCustomer = async (
  cpf: string
): Promise<AxiosResponse<GetCustomerResponse>> => {
  const response = await cashbackInstance.get<GetCustomerResponse>(
    `/loyalty/customer`, {
    params: {
      cpf,
    },
  });

  return response;
}
