import { buildQueryParams } from './buildQueryParams';
import { filterValidParams } from './filterValidParams';

type Params = Record<string, any>;

export const handleObjectToQueryParams = <T extends Params>(
  objectParams: T,
  validKeys: string[],
): string => {
  const filteredParams = filterValidParams(objectParams, validKeys);
  return buildQueryParams(filteredParams);
};
