import { removeSkuColorProductName } from '../removeSkuColorProductName';

describe('removeSkuColorProductName', () => {
  it('should remove the sku color when it is at the end of the product name', () => {
    const productName = 'Product-Red';
    const skuColor = 'Red';
    const result = removeSkuColorProductName(productName, skuColor);
    expect(result).toBe('Product');
  });

  it('should not remove anything when the sku color is not at the end of the product name', () => {
    const productName = 'Product-Red';
    const skuColor = 'Blue';
    const result = removeSkuColorProductName(productName, skuColor);
    expect(result).toBe(productName);
  });

  it('should handle product names that do not contain the sku color at all', () => {
    const productName = 'Product';
    const skuColor = 'Red';
    const result = removeSkuColorProductName(productName, skuColor);
    expect(result).toBe(productName);
  });

  it('should handle empty product names', () => {
    const productName = '';
    const skuColor = 'Red';
    const result = removeSkuColorProductName(productName, skuColor);
    expect(result).toBe('');
  });

  it('should handle empty sku color', () => {
    const productName = 'Product-Red';
    const skuColor = '';
    const result = removeSkuColorProductName(productName, skuColor);
    expect(result).toBe(productName);
  });

  it('should handle product name ending with the sku color but having extra characters', () => {
    const productName = 'Product-Red123';
    const skuColor = 'Red';
    const result = removeSkuColorProductName(productName, skuColor);
    expect(result).toBe(productName);
  });

  it('should remove the sku color when it is at the end of the product name and separated by space', () => {
    const productName = 'Product Red';
    const skuColor = 'Red';
    const result = removeSkuColorProductName(productName, skuColor);
    expect(result).toBe('Product');
  });
});
