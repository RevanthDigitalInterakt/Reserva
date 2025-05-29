type Params = Record<string, any>;

export const filterValidParams = (
  objectParams: Params,
  validKeys: string[],
): Params => validKeys.reduce((acc, key) => {
  if (objectParams[key] && objectParams[key] !== 'null') acc[key] = objectParams[key];
  return acc;
}, {} as Params);
