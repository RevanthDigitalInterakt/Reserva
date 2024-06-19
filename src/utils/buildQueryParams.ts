type Params = Record<string, any>;

export const buildQueryParams = (params: Params): string => Object.entries(params)
  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
  .join('&');
