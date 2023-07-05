import { ProductUtils } from '../productUtils';

describe('ProductUtils', () => {
  let productUtils: ProductUtils;

  beforeEach(() => {
    productUtils = new ProductUtils();
  });

  describe('getColorsArray', () => {
    it('should return an array of colors', () => {
      const products = {
        items: [
          {
            variations: [
              {
                name: 'VALOR_HEX_CONSOLIDADA',
                values: ['#FF0000', '#00FF00', '#0000FF'],
              },
              {
                name: 'OTHER_VARIATION',
                values: ['Value 1', 'Value 2'],
              },
            ],
          },
          {
            variations: [
              {
                name: 'SOME_VARIATION',
                values: ['Value 3', 'Value 4'],
              },
            ],
          },
        ],
      };

      const colors = productUtils.getColorsArray(products);

      expect(colors).toEqual(['#FF0000', '#00FF00', '#0000FF']);
    });

    it('should return an empty array if no colors are found', () => {
      const products = {
        items: [
          {
            variations: [
              {
                name: 'OTHER_VARIATION',
                values: ['Value 1', 'Value 2'],
              },
            ],
          },
        ],
      };

      const colors = productUtils.getColorsArray(products);

      expect(colors).toEqual([]);
    });
  });

  describe('orderSizes', () => {
    it('should return the sizes array sorted in the correct order', () => {
      const sizes = ['XL', 'S', 'M', 'L', 'XS'];

      const orderedSizes = productUtils.orderSizes(sizes);

      expect(orderedSizes).toEqual(['XL', 'XS', 'S', 'M', 'L']);
    });

    it('should remove duplicate sizes from the array', () => {
      const sizes = ['S', 'M', 'S', 'L', 'L', 'XL', 'M'];

      const orderedSizes = productUtils.orderSizes(sizes);

      expect(orderedSizes).toEqual(['XL', 'S', 'M', 'L']);
    });
  });
});
