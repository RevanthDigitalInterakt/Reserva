import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import type { DocumentNode } from 'graphql';
import {
  act, fireEvent, render, screen,
} from '@testing-library/react-native';
import { theme } from '@usereservaapp/reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import {
  OrderFormQuery,
  OrderFormDocument,
} from '../../../base/graphql/generated';
import { orderFormMock } from '../components/ProductList/__mocks__/productListMock';
import NewBag from '../NewBag';
import 'react-native-gesture-handler/jestSetup';
import '../components/ProductList';
import * as useBagStore from '../../../zustand/useBagStore/useBagStore';
import CartContextProvider from '../../../context/CartContext';
import { mockCurrentOrderForm } from './__mocks__/mockCurrentOrderForm';

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
        orderForm: orderFormMock,
        __typename: 'Query',
      },
    },
  },
];

const mockedNavigate = jest.fn();
const mockGoBackFn = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate, goBack: mockGoBackFn }),
}));

jest.mock('../../../zustand/useApolloFetchPolicyStore', () => ({
  useApolloFetchPolicyStore: () => ({
    initialized: true,
    getFetchPolicyPerKey: () => 0,
  }),
}));

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={apolloMocks} addTypename={false}>
      <CartContextProvider>
        <NewBag />
      </CartContextProvider>
    </MockedProvider>
  </ThemeProvider>
);

describe('NewBag', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
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

  it('should call handleNavigateToOffers when the EmptyBag button is pressed', async () => {
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

    await act(async () => {
      await fireEvent.press(goToOffersButton);
    });

    expect(mockedNavigate).toHaveBeenCalledWith('Offers');
  });

  it('should call handleBackTopBarButtonPress when topBarBackButton is pressed', async () => {
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

    await act(async () => {
      await topBarBackButton.forEach((button) => fireEvent.press(button));
    });

    expect(mockGoBackFn).toBeCalled();
  });
});
