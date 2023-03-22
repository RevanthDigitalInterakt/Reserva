import type { SKU } from '../../graphql/products/productSearch';
import { getItemPrice } from '../getItemPrice';

const DEFAULT_ITEM:SKU = {
  images: [{ imageUrl: 'https://lojausereserva.vtexassets.com/arquivos/ids/6537108/0063816040_01.jpg?v=1759952738' }, { imageUrl: 'https://lojausereserva.vtexassets.com/arquivos/ids/6537155/0063816040_02.jpg?v=1759952738' }, { imageUrl: 'https://lojausereserva.vtexassets.com/arquivos/ids/6537136/0063816040_03.jpg?v=1759952738' }, { imageUrl: 'https://lojausereserva.vtexassets.com/arquivos/ids/6537112/0063816040_04.jpg?v=1759952738' }],
  itemId: '236923',
  variations: [{
    originalName: undefined, name: 'Tamanho', values: ['GGG'],
  }, {
    originalName: undefined, name: 'ID_COR_ORIGINAL', values: ['040'],
  }, {
    originalName: undefined, name: 'VALOR_HEX_ORIGINAL', values: ['#1E1E1E'],
  }, {
    originalName: undefined, name: 'DESC_COR_ORIGINAL', values: ['PRETO'],
  }, {
    originalName: undefined, name: 'ID_COR_CONSOLIDADA', values: ['040'],
  }, {
    originalName: undefined, name: 'VALOR_HEX_CONSOLIDADA', values: ['#1E1E1E'],
  }, {
    originalName: undefined, name: 'COR', values: ['PRETO'],
  }],
  sellers: [{
    sellerId: '1',
    commertialOffer: {
      Tax: 0,
      taxPercentage: 0,
      AvailableQuantity: 10000,
      Price: 166.5,
      ListPrice: 369,
      spotPrice: 166.5,
      teasers: [],
      PriceWithoutDiscount: 185,
      discountHighlights: [],
      Installments: [{
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 83.25, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 2,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 83.25, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 2,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 83.25, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 2,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 83.25, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 2,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 83.25, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 2,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 83.25, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 2,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }],
    },
  }],
};

const SOLD_OUT_ITEM:SKU = {
  ean: '0064828904',
  variations: [{
    originalName: undefined, name: 'Tamanho', values: ['37'],
  }, {
    originalName: undefined, name: 'ID_COR_ORIGINAL', values: ['904'],
  }],
  images: [{ imageUrl: 'https://lojausereserva.vtexassets.com/arquivos/ids/6696062/0064828904_01.jpg?v=637836834371870000' }, { imageUrl: 'https://lojausereserva.vtexassets.com/arquivos/ids/6696063/0064828904_03.jpg?v=637836834374530000' }, { imageUrl: 'https://lojausereserva.vtexassets.com/arquivos/ids/6696064/0064828904_05.jpg?v=637836834384830000' }, { imageUrl: 'https://lojausereserva.vtexassets.com/arquivos/ids/6696065/0064828904_02.jpg?v=637836834385470000' }, { imageUrl: 'https://lojausereserva.vtexassets.com/arquivos/ids/6696066/0064828904_04.jpg?v=637836834385800000' }],
  itemId: '361952',
  sellers: [{
    sellerName: 'Reserva',
    sellerId: '1',
    sellerDefault: true,
    commertialOffer: {
      teasers: [],
      AvailableQuantity: 0,
      Price: 629,
      ListPrice: 629,
      spotPrice: 629,
      Tax: 0,
      taxPercentage: 0,
      discountHighlights: [],
      Installments: [],
    },
  }],
};

describe('getItemPrice test', () => {
  it('should return correct values', () => {
    const result = getItemPrice();
    expect(result).toEqual({
      listPrice: 0,
      sellingPrice: 0,
      installments: [],
      installmentsNumber: undefined,
      discountTag: undefined,
      cashPaymentPrice: 0,
      installmentPrice: undefined,
    });
  });

  it('should return correct values when has installments', () => {
    const result = getItemPrice(DEFAULT_ITEM);
    expect(result).toEqual({
      listPrice: 369,
      sellingPrice: 166.5,
      installments: [{
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 83.25, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 2,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 83.25, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 2,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 83.25, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 2,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 83.25, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 2,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 83.25, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 2,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 83.25, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 2,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }, {
        Value: 166.5, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 1,
      }],
      installmentsNumber: {
        Value: 83.25, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 2,
      },
      discountTag: 55,
      cashPaymentPrice: 166.5,
      installmentPrice: {
        Value: 83.25, TotalValuePlusInterestRate: 166.5, NumberOfInstallments: 2,
      },
    });
  });

  it('should return correct values when product has sold out', () => {
    const result = getItemPrice(SOLD_OUT_ITEM);
    expect(result).toEqual({
      listPrice: 629,
      sellingPrice: 629,
      installments: [],
      installmentsNumber: undefined,
      discountTag: undefined,
      cashPaymentPrice: 0,
      installmentPrice: undefined,
    });
  });
});
