import { profileQuery } from '../../../../../graphql/profile/profileQuery';

export const bagInfos = {
  totalBagItemsPrice: 100,
  totalBagItems: 20,
  totalBagDiscountPrice: 40,
  totalBagDeliveryPrice: 60,
};

export const currentOrderForm: any = {
  items: [
    {
      __typename: 'OrderformItemOutput',
      disableCounter: false,
      discountApi: 0,
      discountPercent: 60,
      giftOfferingId: '211257',
      id: '236978',
      imageSource:
        'https://lojausereserva.vteximg.com.br/arquivos/ids/6536884/0063189054_01.jpg?v=637744141370600000',
      isAddedAsGift: false,
      isAssinaturaSimples: false,
      isGift: false,
      isGiftable: true,
      isPrimeSubscription: false,
      itemColor: 'VERMELHO',
      itemSize: 'M',
      key: '236978-21900-8800-8800-8800-1-1-camiseta-estampada-netflix-vermelho-m-',
      listPrice: 21900,
      name: 'CAMISETA ESTAMPADA NETFLIX VERMELHO - M',
      price: 8800,
      priceWithDiscount: 88,
      productId: '34997',
      productTitle: 'CAMISETA ESTAMPADA NETFLIX VERMELHO',
      quantity: 1,
      seller: '1',
      sellingPrice: 8800,
      showFirstPurchaseDiscountMessage: null,
      showTotalDiscountFirstPurchaseValue: null,
      skuName: 'VERMELHO - M',
      uniqueId: '79EEE352AEB0430081FC01CB158D5E95',
    },
    {
      __typename: 'OrderformItemOutput',
      disableCounter: false,
      discountApi: 0,
      discountPercent: 0,
      giftOfferingId: '9383',
      id: '95749',
      imageSource:
        'https://lojausereserva.vteximg.com.br/arquivos/ids/7077198/0027770040_03.jpg?v=637941226399030000',
      isAddedAsGift: false,
      isAssinaturaSimples: false,
      isGift: false,
      isGiftable: true,
      isPrimeSubscription: false,
      itemColor: 'PRETO',
      itemSize: 'M',
      key: '95749-16900-16900-16900-16900-lojausereservaondemand-1-camiseta-bolso-cb-pica-pau-xadrez-preto-m-',
      listPrice: 16900,
      name: 'CAMISETA BOLSO CB PICA-PAU XADREZ PRETO - M',
      price: 16900,
      priceWithDiscount: 169,
      productId: '9015',
      productTitle: 'CAMISETA BOLSO CB PICA-PAU XADREZ PRETO',
      quantity: 1,
      seller: 'lojausereservaondemand',
      sellingPrice: 16900,
      showFirstPurchaseDiscountMessage: null,
      showTotalDiscountFirstPurchaseValue: null,
      skuName: 'PRETO - M',
      uniqueId: '654A09389D614383B455057E262BD4B0',
    },
  ],
  orderFormId: '1',
};

export const installmentInfo = {
  installmentPrice: 110,
  installmentsNumber: 40,
  totalPrice: 1000,
};

export const apolloMocks = [
  {
    request: {
      query: profileQuery,
      variables: {},
    },
    result: {
      data: {
        profile: {
          __typename:
            'vtex_storegraphql_2_160_0_Profile',
          addresses: [[{}]],
          customFields: [[{}], [{}], [{}]],
          userId: '4d35c3cf-d4a1-4c52-a421-66d8f97f1b10',
          firstName: 'Tester',
          lastName: 'Silva',
          fullName: 'teste da Silva',
          email: 'nogueirahy@gmail.com',
          document: '11111111111',
          birthDate: '1980-01-01T00:00:00.000Z',
          gender: 'male',
          homePhone: '+5511991111111',
          payments: null,
          passwordLastUpdate: 'teste123',
        },
      },
    },
  },
];

export const apolloMocksWithoutDataUser = [
  {
    request: {
      query: profileQuery,
      variables: {},
    },
    result: {
      data: {
        profile: {
          __typename: 'vtex_storegraphql_2_160_0_Profile',
          userId: '4d35c3cf-d4a1-4c52-a421-66d8f97f1b10',
          firstName: null,
          lastName: null,
          fullName: null,
          email: 'nogueirahy@gmail.com',
          document: null,
          birthDate: null,
          gender: 'male',
          homePhone: null,
          payments: null,
          passwordLastUpdate: 'teste123',
        },
      },
    },
  },
];
