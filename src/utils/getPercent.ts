export const getPercent = (
  sellingPrice: number,
  listPrice: number,
): number | undefined => {
  if (sellingPrice >= listPrice) {
    return undefined;
  }
  return Math.round(((listPrice - sellingPrice) * 100) / listPrice);
};
