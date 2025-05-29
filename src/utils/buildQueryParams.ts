import { sanitizeString } from './sanitizeString';

type Params = Record<string, any>;

export const buildQueryParams = (params: Params): string => {
  const searchParams = new URLSearchParams();

  const appendParam = (key: string, value: any) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(sanitizeString(key), sanitizeString(item));
      });
    } else if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        appendParam(`${key}-${sanitizeString(subKey)}`, subValue);
      });
    } else {
      searchParams.append(sanitizeString(key), sanitizeString(value));
    }
  };

  Object.entries(params).forEach(([key, value]) => {
    appendParam(key, value);
  });

  return searchParams.toString();
};
