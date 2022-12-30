import { useMemo } from 'react';
import axios from 'axios';
import * as Sentry from '@sentry/react-native';

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

          Sentry.withScope((scope) => {
            scope.setExtra('status', status);
            scope.setExtra('body', data);
            scope.setExtra('response', err.response);
            Sentry.captureException(err);
          });
        }

        return Promise.reject(err);
      },
    );

    return instance;
  }, [url, headers]);

  return client;
}
