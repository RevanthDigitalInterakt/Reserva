import type { AxiosResponse } from 'axios';

export const asyncRequestHandler = async (promise: Promise<AxiosResponse>) => {
  try {
    return await promise;
  } catch ({ response }: any) {
    return response;
  }
};
