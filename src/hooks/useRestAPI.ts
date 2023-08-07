import { useMemo } from 'react';
import axios from 'axios';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

// TODO: Replace with useQuery
export function useRestAPI(url: string, headers: { [key: string]: string } = {}) {
  const client = useMemo(() => {
    const instance = axios.create({
      baseURL: url,
      timeout: 10000,
      headers: {
        Accept: 'application/json',
        ...headers,
      },
    });

    instance.interceptors.response.use(
      (response) => response,

      (err) => {
        if (err?.response) {
          const { status, data } = err.response || {};

          ExceptionProvider.captureException(err, {
            status, body: data, response: err.response,
          });
        }

        return Promise.reject(err);
      },
    );

    return instance;
  }, [url, headers]);

  return client;
}
