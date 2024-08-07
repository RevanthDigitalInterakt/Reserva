export const removeSkuColorProductName = (productName: string, skuColor: string) => (
  productName.endsWith(skuColor)
    ? productName.substring(0, (productName.length - (skuColor.length + 1))) : productName);
