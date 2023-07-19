export type IVariation = {
  name: string;
  values: string[]
};

export const getProductColor = (variation: IVariation[]) => {
  if (!variation) return 'Branco';

  const getColor = variation.filter((x: IVariation) => x.name === 'COR');

  const color = getColor.map((item: IVariation) => item.values).join();

  return color;
};
