import { ProductQL, SKU } from "../../graphql/products/productSearch";

export class ProductUtils{
  getColorsArray(products: ProductQL){
    let colors: any[] = [];
    products.items.forEach(item => {
      item.variations?.forEach((variation) => {
        if (variation.name === 'VALOR_HEX_CONSOLIDADA') {
          colors = colors.concat(variation?.values)
        }
      })
    })
    return colors;
  }
}