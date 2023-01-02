import { ProductQL } from '../../graphql/products/productSearch';

export class ProductUtils {
  getColorsArray(products: ProductQL) {
    let colors: any[] = [];
    products.items.forEach((item) => {
      item.variations?.forEach((variation) => {
        if (variation.name === 'VALOR_HEX_CONSOLIDADA') {
          colors = colors.concat(variation?.values);
        }
      });
    });
    return colors;
  }

  orderSizes(sizes: string[]) {
    return sizes
      ?.sort((itemA, itemB) => {
        const b = itemA;
        const a = itemB;
        if (parseInt(a) > 0) {
          return a > b ? -1 : 1;
        }
        if (a.charAt(0) === b.charAt(0)) {
          if (a.length > b.length) {
            return -1;
          }
          if (a.length < b.length) {
            return 1;
          }
          return 0;
        }
        return a < b ? -1 : 1;
      })
      .filter((value, index, self) => self.indexOf(value) === index);
  }
}
