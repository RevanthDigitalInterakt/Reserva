import { sanitizeString } from './sanitizeString';

type Params = Record<string, any>;

export const buildQueryParams = (params: Params): string => Object.entries(params)
  .map(([key, value]) => `${encodeURIComponent(sanitizeString(key))}=${encodeURIComponent(sanitizeString(value) as string)}`)
  .join('&');
