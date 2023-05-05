import React from 'react';
import { theme } from '@usereservaapp/reserva-ui';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import { fireEvent, render } from '@testing-library/react-native';
import { act } from '@testing-library/react-hooks';
import BagFooter from '..';
import EventProvider from '../../../../../utils/EventProvider';
import { AuthContext } from '../../../../../context/AuthContext';
import CartContextProvider from '../../../../../context/CartContext';
import useBagStore from '../../../../../zustand/useBagStore/useBagStore';
import {
  apolloMocks, apolloMocksWithoutDataUser, bagInfos, currentOrderForm, installmentInfo,
} from '../__mocks__';

jest.mock('../../../../../utils/EventProvider');

const mockedFn = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedFn }),
}));

describe('BagFooter Component', () => {
  const email = 'test@example.com';
  const mockAuthContextValue: any = { email };

  it('should be renders correctly with EventProvider', async () => {
    await act(async () => {
      useBagStore.setState({
        currentOrderForm,
        installmentInfo,
        bagInfos,
        topBarLoading: false,
        dispatch: jest
          .fn()
          .mockReturnValue({ unavailableItems: { error: false } }),
        getPriceWithDiscount: jest.fn(),
      });
    });

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={apolloMocksWithoutDataUser}>
          <CartContextProvider>
            <AuthContext.Provider value={mockAuthContextValue}>
              <BagFooter isProfileComplete={false} />
            </AuthContext.Provider>
          </CartContextProvider>
        </MockedProvider>
      </ThemeProvider>,
    );

    const button = getByTestId('com.usereserva:id/bag_button_go_to_delivery');

    await act(async () => {
      await fireEvent.press(button);
    });

    expect(EventProvider.logEvent).toHaveBeenNthCalledWith(1,
      'begin_checkout',
      {
        coupon: '',
        currency: 'BRL',
        items: [{
          item_category: '[object Object]', item_id: 4, item_name: 'Produto A', item_variant: 'test', price: 0.5, quantity: 2,
        }, {
          item_category: '[object Object]', item_id: 4, item_name: 'Produto B', item_variant: 'test', price: 0.2, quantity: 1,
        }],
        value: 200,
      });

    expect(EventProvider.logEvent).toHaveBeenNthCalledWith(2, 'checkout_initiated', {
      content_ids: [4, 4], content_type: ['[object Object]', '[object Object]'], currency: 'BRL', price: 200, quantity: '[{"id":4,"quantity":3}]',
    });
  });

  it('should capture exception on EventProvider', async () => {
    const currentOrderFormMock: any = {
      items: [
        {
          name: 'Produto A',
          skuName: 'test',
          price: 50.0,
          quantity: 2,
          productId: 4,

        },
      ],
      orderFormId: '1',
    };

    await act(async () => {
      useBagStore.setState({
        currentOrderForm: currentOrderFormMock,
        installmentInfo,
        bagInfos,
        topBarLoading: false,
        dispatch: jest
          .fn()
          .mockReturnValue({ unavailableItems: { error: false } }),
        getPriceWithDiscount: jest.fn(),
      });
    });

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={apolloMocks}>
          <CartContextProvider>
            <AuthContext.Provider value={mockAuthContextValue}>
              <BagFooter isProfileComplete={false} />
            </AuthContext.Provider>
          </CartContextProvider>
        </MockedProvider>
      </ThemeProvider>,
    );
    const buttonDelivery = getByTestId('com.usereserva:id/bag_button_go_to_delivery');

    await act(async () => {
      await fireEvent.press(buttonDelivery);
    });

    expect(EventProvider.captureException).toBeTruthy();
  });

  it('Should renders the error message for unavailable items', async () => {
    const dispatch = jest
      .fn()
      .mockReturnValue({ unavailableItems: { error: true } });
    await act(async () => {
      useBagStore.setState({
        currentOrderForm,
        installmentInfo,
        bagInfos,
        topBarLoading: false,
        dispatch,
        getPriceWithDiscount: jest.fn(),
      });
    });

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={apolloMocksWithoutDataUser}>
          <CartContextProvider>
            <BagFooter isProfileComplete />
          </CartContextProvider>
        </MockedProvider>
      </ThemeProvider>,
    );

    const buttonDelivery = getByTestId('com.usereserva:id/bag_button_go_to_delivery');
    expect(buttonDelivery).toBeTruthy();

    await act(async () => {
      await fireEvent.press(buttonDelivery);
    });

    expect(dispatch).toHaveBeenNthCalledWith(1, { actionType: 'HANDLE_REMOVE_UNAVAILABLE_ITEMS', payload: { value: {} } });
  });

  it('Should be renders correctly without email', async () => {
    const dispatch = jest
      .fn()
      .mockReturnValue({ unavailableItems: { error: false } });

    await act(async () => {
      useBagStore.setState({
        currentOrderForm,
        installmentInfo,
        bagInfos,
        topBarLoading: false,
        dispatch,
        getPriceWithDiscount: jest.fn(),
      });
    });

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={apolloMocks}>
          <CartContextProvider>
            <BagFooter isProfileComplete />
          </CartContextProvider>
        </MockedProvider>
      </ThemeProvider>,
    );

    const buttonDelivery = getByTestId('com.usereserva:id/bag_button_go_to_delivery');
    expect(buttonDelivery).toBeTruthy();

    await act(async () => {
      await fireEvent.press(buttonDelivery);
    });

    expect(dispatch).toHaveBeenNthCalledWith(1, { actionType: 'HANDLE_REMOVE_UNAVAILABLE_ITEMS', payload: { value: {} } });
  });
});
