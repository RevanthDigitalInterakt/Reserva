export const removeSkuColorProductName = (productName: string, skuColor: string): string => {
  if (!productName || !skuColor) {
    return productName;
  }

  const separatorLength = 1;
  const shouldRemoveSkuColor = productName.endsWith(skuColor);
  const removalIndex = productName.length - skuColor.length - separatorLength;

  return shouldRemoveSkuColor && removalIndex >= 0
    ? productName.substring(0, removalIndex)
    : productName;
};
