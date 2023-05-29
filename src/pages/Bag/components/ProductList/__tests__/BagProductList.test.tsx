import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import {
  render, screen, act, waitFor, fireEvent,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@usereservaapp/reserva-ui';
import type { DocumentNode } from 'graphql';
import { renderHook } from '@testing-library/react-hooks';
import BagProductList from '..';
import { InitialBagStoreQuery, InitialBagStoreDocument } from '../../../../../base/graphql/generated';
import { orderFormMock } from '../__mocks__/productListMock';
import * as useBagStore from '../../../../../zustand/useBagStore/useBagStore';

const dispatch = jest.fn();

const mockedNavigate = jest.fn();
const mockGoBackFn = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate, goBack: mockGoBackFn }),
}));
interface IApolloMock<T> {
  request: {
    query: DocumentNode,
    variables: object,
  },
  result: {
    data: T
  }
}

const apolloMocks: Array<IApolloMock<InitialBagStoreQuery>> = [
  {
    request: {
      query: InitialBagStoreDocument,
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

const component = (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={apolloMocks} addTypename={false}>
      <BagProductList />
    </MockedProvider>
  </ThemeProvider>
);

describe('BagProductList', () => {
  beforeEach(() => {
    jest.spyOn(useBagStore, 'default').mockReturnValue({
      currentBagItems: [{
        productTitle: 'CAMISA ML SAMOA BRANCO',
        itemColor: 'BRANCO',
        itemSize: 'P',
        isGift: false,
        isGiftable: true,
        imageSource: 'https://lojausereserva.vteximg.com.br/arquivos/ids/6413946/0054128014_01.jpg?v=637692018478770000',
        key: '90368-39900-19929-19929-19929-1-1-camisa-ml-samoa-branco-p-',
        isAssinaturaSimples: false,
        priceWithDiscount: 199.29,
        discountPercent: 50,
        discountApi: 0,
        showFirstPurchaseDiscountMessage: 'Promoção de São João',
        showTotalDiscountFirstPurchaseValue: 50,
        price: 27900,
        productId: '3239',
        id: '90368',
        listPrice: 39900,
        giftOfferingId: '90310',
        seller: '1',
        skuName: 'BRANCO - P',
        uniqueId: '52D9B57139FA4292909748AE8ED11774',
        isAddedAsGift: false,
        name: 'CAMISA ML SAMOA BRANCO - P',
        quantity: 1,
        disableCounter: false,
        sellingPrice: 19929,
        __typename: 'OrderformItemOutput',
      }],
      dispatch,
    });
    render(component);
    dispatch.mockClear();
    mockedNavigate.mockClear();
    mockGoBackFn.mockClear();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it.skip('should match with snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it.skip('should render all products in currentBagItems array', async () => {
    const allProducts = await waitFor(() => screen.getAllByTestId('com.usereserva:id/BagProductList'));

    allProducts.forEach((product) => {
      expect(product).toBeOnTheScreen();
    });
  });

  it.skip('should render list of bag items', async () => {
    const { result } = renderHook(() => useBagStore.default());

    await act(async () => screen.rerender(component));

    expect(result.current.currentBagItems.length).toEqual(1);
  });

  it.skip('should render ShowFirstPurchaseDiscount and ShowTotalDiscountFirstPurchase when has showFirstPurchaseDiscountMessage and showTotalDiscountFirstPurchaseValue', () => {
    expect(screen.getByTestId('com.usereserva:id/ShowFirstPurchaseDiscount')).toBeOnTheScreen();
    expect(screen.getByTestId('com.usereserva:id/ShowTotalDiscountFirstPurchase')).toBeOnTheScreen();
  });

  it.skip('should go to ProductDetails if product image is clicked', async () => {
    const productImage = screen.getByTestId('product_card_bag_3239branco-p_image');

    await act(async () => {
      await fireEvent.press(productImage);
    });

    expect(mockedNavigate).toBeCalled();
  });

  it.skip('should call handleAddCount correctly', async () => {
    const addCount = screen.getByTestId('product_card_bag_3239branco-p_count_add');

    await act(async () => {
      await fireEvent.press(addCount);
    });

    expect(dispatch).toHaveBeenNthCalledWith(1, { actionType: 'SET_TOP_BAR_LOADING', payload: { value: true } });
  });

  it.skip('should call handleSubCount correctly', async () => {
    const subCount = screen.getByTestId('product_card_bag_3239branco-p_count_sub');

    await act(async () => {
      await fireEvent.press(subCount);
    });

    expect(dispatch).toHaveBeenNthCalledWith(1, { actionType: 'SET_TOP_BAR_LOADING', payload: { value: true } });
  });

  it.skip('should call handleSubCount correctly with a quantity greater than 1', async () => {
    jest.spyOn(useBagStore, 'default').mockReturnValue({
      currentBagItems: [{
        productTitle: 'CAMISA ML SAMOA BRANCO',
        itemColor: 'BRANCO',
        itemSize: 'P',
        isGift: false,
        isGiftable: true,
        imageSource: 'https://lojausereserva.vteximg.com.br/arquivos/ids/6413946/0054128014_01.jpg?v=637692018478770000',
        key: '90368-39900-19929-19929-19929-1-1-camisa-ml-samoa-branco-p-',
        isAssinaturaSimples: false,
        priceWithDiscount: 199.29,
        discountPercent: 50,
        discountApi: 0,
        showFirstPurchaseDiscountMessage: 'Promoção de São João',
        showTotalDiscountFirstPurchaseValue: 50,
        price: 27900,
        productId: '3239',
        id: '90368',
        listPrice: 39900,
        giftOfferingId: '90310',
        seller: '1',
        skuName: 'BRANCO - P',
        uniqueId: '52D9B57139FA4292909748AE8ED11774',
        isAddedAsGift: false,
        name: 'CAMISA ML SAMOA BRANCO - P',
        quantity: 5,
        disableCounter: false,
        sellingPrice: 19929,
        __typename: 'OrderformItemOutput',
      }],
      dispatch: jest.fn(),
    });
    render(component);

    const subCount = screen.getByTestId('product_card_bag_3239branco-p_count_sub');

    await act(async () => {
      await fireEvent.press(subCount);
    });

    expect(dispatch).not.toHaveBeenCalled();
  });

  it.skip('should call handleAddProductToGift correctly', async () => {
    const handleAddProductToGift = screen.getByTestId('product_card_bag_3239branco-p_isGift');

    await act(async () => {
      await fireEvent.press(handleAddProductToGift);
    });

    expect(dispatch).toHaveBeenCalled();
  });

  it.skip('should call handleAddProductToGift without id', async () => {
    jest.spyOn(useBagStore, 'default').mockReturnValue({
      currentBagItems: [{
        productTitle: 'CAMISA ML SAMOA BRANCO',
        itemColor: 'BRANCO',
        itemSize: 'P',
        isGift: false,
        isGiftable: true,
        imageSource: 'https://lojausereserva.vteximg.com.br/arquivos/ids/6413946/0054128014_01.jpg?v=637692018478770000',
        key: '90368-39900-19929-19929-19929-1-1-camisa-ml-samoa-branco-p-',
        isAssinaturaSimples: false,
        priceWithDiscount: 199.29,
        discountPercent: 50,
        discountApi: 0,
        showFirstPurchaseDiscountMessage: 'Promoção de São João',
        showTotalDiscountFirstPurchaseValue: 50,
        price: 27900,
        productId: '3239',
        id: '90368',
        listPrice: 39900,
        seller: '1',
        skuName: 'BRANCO - P',
        uniqueId: '52D9B57139FA4292909748AE8ED11774',
        isAddedAsGift: false,
        name: 'CAMISA ML SAMOA BRANCO - P',
        quantity: 1,
        disableCounter: false,
        sellingPrice: 19929,
        __typename: 'OrderformItemOutput',
      }],
      dispatch,
    });

    render(component);

    const handleAddProductToGift = screen.getByTestId('product_card_bag_3239branco-p_isGift');

    await act(async () => {
      await fireEvent.press(handleAddProductToGift);
    });

    expect(dispatch).not.toHaveBeenCalled();
  });
});
