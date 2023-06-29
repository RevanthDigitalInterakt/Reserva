import type { AxiosInstance, AxiosResponse } from 'axios';

export class HttpService {
  private axiosInstance: AxiosInstance;

  constructor(ApiInstance: AxiosInstance) {
    this.axiosInstance = ApiInstance;
  }

  async get<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, {
      params,
    });
  }

  async post<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data);
  }

  async delete<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, {
      params,
    });
  }
}
