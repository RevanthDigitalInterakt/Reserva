import type { IVariation } from './getProductColor';

export const getProductSize = (variation: IVariation[]) => {
  if (!variation) return 'P';

  const getSize = variation.filter((x: IVariation) => x.name === 'Tamanho');

  const size = getSize.map((item: IVariation) => item.values).join();

  return size;
};
