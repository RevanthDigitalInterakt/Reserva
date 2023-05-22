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
      name: 'Produto A',
      skuName: 'test',
      price: 50.0,
      quantity: 2,
      productId: 4,
      productCategories: [
        {},
      ],
      additionalInfo: {
        brandName: 'RESERVA',
      },
    },
    {
      name: 'Produto B',
      skuName: 'test',
      price: 20.0,
      quantity: 1,
      productId: 4,
      productCategories: [
        {},
      ],
      additionalInfo: {
        brandName: 'RESERVA',
      },
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
          __typename:
            'vtex_storegraphql_2_160_0_Profile',
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
