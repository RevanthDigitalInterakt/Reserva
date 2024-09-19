import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import type { DocumentNode } from 'graphql';
import {
  act, fireEvent, render, screen,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  type OrderFormQuery,
  OrderFormDocument,
} from '../../../base/graphql/generated';
import NewBag from '../NewBag';
import 'react-native-gesture-handler/jestSetup';
import '../components/ProductList';
import * as useBagStore from '../../../zustand/useBagStore/useBagStore';
import { mockCurrentOrderForm } from './__mocks__/mockCurrentOrderForm';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { theme } from '../../../base/usereservappLegacy/theme';

type TNavigation = StackScreenProps<RootStackParamList, 'BagScreen'>['navigation'];

interface IApolloMock<T> {
  request: {
    query: DocumentNode;
    variables: object;
  };
  result: {
    data: T;
  };
}

const apolloMocks: Array<IApolloMock<OrderFormQuery>> = [
  {
    request: {
      query: OrderFormDocument,
      variables: {},
    },
    result: {
      data: {
        orderForm: mockCurrentOrderForm,
        __typename: 'Query',
      },
    },
  },
];

const mockedNavigate = jest.fn();
const mockGoBackFn = jest.fn();

const navigationMock: Partial<TNavigation> = {
  navigate: mockedNavigate,
  goBack: mockGoBackFn,
};

jest.mock('../../../zustand/useApolloFetchPolicyStore', () => ({
  useApolloFetchPolicyStore: () => ({
    initialized: true,
    getFetchPolicyPerKey: () => 0,
  }),
}));

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={apolloMocks} addTypename={false}>
      <NewBag
        navigation={navigationMock as TNavigation}
        route={{
          name: 'BagScreen',
          key: '',
          params: { isProfileComplete: false, orderFormId: '' },
        }}
      />
    </MockedProvider>
  </ThemeProvider>
);

describe('NewBag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match with the snapshot', () => {
    jest.spyOn(useBagStore, 'useBagStore').mockReturnValue({
      actions: {
        CLOSE_MODAL_DELETE_PRODUCT: jest.fn(),
        REFETCH_ORDER_FORM: jest.fn(),
      },
      appTotalizers: {
        delivery: 0,
        discount: 27,
        items: 180,
        total: 152,
        __typename: 'OrderformAppTotalizersOutput',
      },
      topBarLoading: false,
      items: mockCurrentOrderForm.items,
      initialLoad: false,
      initialized: true,
      installmentInfo: {
        __typename: 'OrderformInstallmentInfoOutput',
        installmentPrice: 88,
        installmentsNumber: 1,
        totalPrice: 88,
      },
      packageItems: [{ items: mockCurrentOrderForm.items }],
      productNotFound: 'Product Not found',
      selectableGift: null,
      deleteProductModal: {
        show: false,
        deleteInfo: {
          index: 0,
          product: {
            __typename: 'OrderformItemOutput',
            disableCounter: false,
            discountApi: 0,
            discountPercent: 60,
            giftOfferingId: '211222',
            id: '236953',
            imageSource:
              'https://lojausereserva.vteximg.com.br/arquivos/ids/6536635/0063187054_01.jpg?v=637744092183000000',
            isAddedAsGift: false,
            isAssinaturaSimples: false,
            isGift: false,
            isGiftable: true,
            isPrimeSubscription: false,
            itemColor: 'VERMELHO',
            itemSize: 'M',
            key: '236953-21900-8800-8800-8800-1-1-camiseta-estampada-netflix-chill-vermelho-m-',
            listPrice: 21900,
            name: 'CAMISETA ESTAMPADA NETFLIX CHILL VERMELHO - M',
            price: 8800,
            priceWithDiscount: 88,
            productId: '34980',
            productTitle: 'CAMISETA ESTAMPADA NETFLIX CHILL VERMELHO',
            quantity: 1,
            seller: '1',
            sellingPrice: 8800,
            showFirstPurchaseDiscountMessage: null,
            showTotalDiscountFirstPurchaseValue: null,
            skuName: 'VERMELHO - M',
            uniqueId: 'FD10CC41F4B94E698633710AFDE70D31',
          },
        },
      },
    } as any);

    render(Component);

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should render empty bag if current items has no length', () => {
    jest.spyOn(useBagStore, 'useBagStore').mockReturnValue({
      actions: {
        CLOSE_MODAL_DELETE_PRODUCT: jest.fn(),
        REFETCH_ORDER_FORM: jest.fn(),
      },
      appTotalizers: {
        delivery: 0,
        discount: 27,
        items: 180,
        total: 152,
        __typename: 'OrderformAppTotalizersOutput',
      },
      topBarLoading: false,
      items: [],
      packageItems: [{ items: [] }],
      initialLoad: false,
      initialized: true,
      installmentInfo: {
        __typename: 'OrderformInstallmentInfoOutput',
        installmentPrice: 88,
        installmentsNumber: 1,
        totalPrice: 88,
      },
      productNotFound: 'Product Not found',
      selectableGift: null,
      deleteProductModal: {
        show: false,
        deleteInfo: {
          index: 0,
          product: {
            __typename: 'OrderformItemOutput',
            disableCounter: false,
            discountApi: 0,
            discountPercent: 60,
            giftOfferingId: '211222',
            id: '236953',
            imageSource:
              'https://lojausereserva.vteximg.com.br/arquivos/ids/6536635/0063187054_01.jpg?v=637744092183000000',
            isAddedAsGift: false,
            isAssinaturaSimples: false,
            isGift: false,
            isGiftable: true,
            isPrimeSubscription: false,
            itemColor: 'VERMELHO',
            itemSize: 'M',
            key: '236953-21900-8800-8800-8800-1-1-camiseta-estampada-netflix-chill-vermelho-m-',
            listPrice: 21900,
            name: 'CAMISETA ESTAMPADA NETFLIX CHILL VERMELHO - M',
            price: 8800,
            priceWithDiscount: 88,
            productId: '34980',
            productTitle: 'CAMISETA ESTAMPADA NETFLIX CHILL VERMELHO',
            quantity: 1,
            seller: '1',
            sellingPrice: 8800,
            showFirstPurchaseDiscountMessage: null,
            showTotalDiscountFirstPurchaseValue: null,
            skuName: 'VERMELHO - M',
            uniqueId: 'FD10CC41F4B94E698633710AFDE70D31',
          },
        },
      },
    } as any);

    render(Component);

    const emptyBag = screen.getByTestId('com.usereserva:id/EmptyBag');

    expect(emptyBag).toBeOnTheScreen();
  });

  it('should call handleNavigateToOffers when the EmptyBag button is pressed', () => {
    jest.spyOn(useBagStore, 'useBagStore').mockReturnValue({
      actions: {
        CLOSE_MODAL_DELETE_PRODUCT: jest.fn(),
        REFETCH_ORDER_FORM: jest.fn(),
      },
      appTotalizers: {
        delivery: 0,
        discount: 27,
        items: 180,
        total: 152,
        __typename: 'OrderformAppTotalizersOutput',
      },
      topBarLoading: false,
      items: [],
      packageItems: [{ items: [] }],
      initialLoad: false,
      initialized: true,
      installmentInfo: {
        __typename: 'OrderformInstallmentInfoOutput',
        installmentPrice: 88,
        installmentsNumber: 1,
        totalPrice: 88,
      },
      productNotFound: 'Product Not found',
      selectableGift: null,
      deleteProductModal: {
        show: false,
        deleteInfo: {
          index: 0,
          product: {
            __typename: 'OrderformItemOutput',
            disableCounter: false,
            discountApi: 0,
            discountPercent: 60,
            giftOfferingId: '211222',
            id: '236953',
            imageSource:
              'https://lojausereserva.vteximg.com.br/arquivos/ids/6536635/0063187054_01.jpg?v=637744092183000000',
            isAddedAsGift: false,
            isAssinaturaSimples: false,
            isGift: false,
            isGiftable: true,
            isPrimeSubscription: false,
            itemColor: 'VERMELHO',
            itemSize: 'M',
            key: '236953-21900-8800-8800-8800-1-1-camiseta-estampada-netflix-chill-vermelho-m-',
            listPrice: 21900,
            name: 'CAMISETA ESTAMPADA NETFLIX CHILL VERMELHO - M',
            price: 8800,
            priceWithDiscount: 88,
            productId: '34980',
            productTitle: 'CAMISETA ESTAMPADA NETFLIX CHILL VERMELHO',
            quantity: 1,
            seller: '1',
            sellingPrice: 8800,
            showFirstPurchaseDiscountMessage: null,
            showTotalDiscountFirstPurchaseValue: null,
            skuName: 'VERMELHO - M',
            uniqueId: 'FD10CC41F4B94E698633710AFDE70D31',
          },
        },
      },
    } as any);

    render(Component);

    const goToOffersButton = screen.getByTestId('com.usereserva:id/button_going_shopping_empty_bag');

    act(async () => {
      fireEvent.press(goToOffersButton);
    });

    expect(mockedNavigate).toHaveBeenCalledWith('Offers');
  });

  it('should call handleBackTopBarButtonPress when topBarBackButton is pressed', () => {
    jest.spyOn(useBagStore, 'useBagStore').mockReturnValue({
      actions: {
        CLOSE_MODAL_DELETE_PRODUCT: jest.fn(),
        REFETCH_ORDER_FORM: jest.fn(),
      },
      appTotalizers: {
        delivery: 0,
        discount: 27,
        items: 180,
        total: 152,
        __typename: 'OrderformAppTotalizersOutput',
      },
      topBarLoading: false,
      items: mockCurrentOrderForm.items,
      packageItems: [{ items: mockCurrentOrderForm.items }],
      initialLoad: false,
      initialized: true,
      installmentInfo: {
        __typename: 'OrderformInstallmentInfoOutput',
        installmentPrice: 88,
        installmentsNumber: 1,
        totalPrice: 88,
      },
      productNotFound: 'Product Not found',
      selectableGift: null,
      deleteProductModal: {
        show: false,
        deleteInfo: {
          index: 0,
          product: {
            __typename: 'OrderformItemOutput',
            disableCounter: false,
            discountApi: 0,
            discountPercent: 60,
            giftOfferingId: '211222',
            id: '236953',
            imageSource:
              'https://lojausereserva.vteximg.com.br/arquivos/ids/6536635/0063187054_01.jpg?v=637744092183000000',
            isAddedAsGift: false,
            isAssinaturaSimples: false,
            isGift: false,
            isGiftable: true,
            isPrimeSubscription: false,
            itemColor: 'VERMELHO',
            itemSize: 'M',
            key: '236953-21900-8800-8800-8800-1-1-camiseta-estampada-netflix-chill-vermelho-m-',
            listPrice: 21900,
            name: 'CAMISETA ESTAMPADA NETFLIX CHILL VERMELHO - M',
            price: 8800,
            priceWithDiscount: 88,
            productId: '34980',
            productTitle: 'CAMISETA ESTAMPADA NETFLIX CHILL VERMELHO',
            quantity: 1,
            seller: '1',
            sellingPrice: 8800,
            showFirstPurchaseDiscountMessage: null,
            showTotalDiscountFirstPurchaseValue: null,
            skuName: 'VERMELHO - M',
            uniqueId: 'FD10CC41F4B94E698633710AFDE70D31',
          },
        },
      },
    } as any);

    render(Component);

    const topBarBackButton = screen.getAllByTestId('com.usereserva:id/top_bar_button_go_back');

    act(async () => {
      topBarBackButton.forEach((button) => fireEvent.press(button));
    });

    expect(mockGoBackFn).toBeCalled();
  });
});
