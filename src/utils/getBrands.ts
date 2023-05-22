interface Item {
  additionalInfo: {
    brandName: string;
  }
}

export const getBrands = (items: Item[]) => {
  const brandNames = items.map((item) => item.additionalInfo?.brandName || '');
  return brandNames.join(',');
};
