import React from 'react';
import AsyncStorageMock from '@react-native-community/async-storage/jest/async-storage-mock';
import AsyncStorage from '@react-native-community/async-storage';
import {
  fireEvent, render, screen, act,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@usereservaapp/reserva-ui';
import { MockedProvider } from '@apollo/client/testing';
import CartContextProvider from '../../../../context/CartContext';
import Checkout from '../WebviewCheckout';
import EventProvider from '../../../../utils/EventProvider';

jest.spyOn(Date, 'now').mockImplementation(() => 1621556195000);

jest.mock('../../../../utils/EventProvider');

jest.mock('../../../../services/vtexService', () => ({
  ...jest.requireActual('../../../../services/vtexService'),
  CreateCart: jest.fn().mockResolvedValue({
    data: {
      orderFormId: '128adb08596442708ee89e2a0f561321',
      value: 3500,
      totalizers: [
        {
          id: 'Items',
          name: 'Total dos Itens',
          value: 23900,
        },
      ],
    },
  }),
}));

jest.mock('../../../../zustand/useApolloFetchPolicyStore', () => ({
  useApolloFetchPolicyStore: () => ({
    getFetchPolicyPerKey: jest.fn(),
  }),
}));

AsyncStorageMock.getItem = jest.fn((key) => {
  if (key === '@RNAuth:RSAKey') {
    return Promise.resolve('rsaKey123');
  }

  if (key === '@Dito:userRef') {
    return Promise.resolve('65e82407d5d594262e1d2686e1e2db37b948f768');
  }

  if (key === '@RNSession:Ron') return Promise.resolve('false');

  if (key === 'isTesting') return Promise.resolve('false');

  return Promise.resolve('');
});

describe('userOrdered', () => {
  it('render and snapshot', async () => {
    const Wrapper = (
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={[]}>
          <CartContextProvider>
            <Checkout />
          </CartContextProvider>
        </MockedProvider>
      </ThemeProvider>
    );

    render(Wrapper);

    await act(async () => {
      await screen.rerender(Wrapper);
    });

    expect(screen.toJSON()).toMatchSnapshot();

    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(1, 'isTesting');
  });

  it('WHEN trackEventOrderedDito success should return ordered event payload', async () => {
    const logEventSpy = jest.spyOn(EventProvider, 'sendTrackEvent');

    const Wrapper = (
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={[]}>
          <CartContextProvider>
            <Checkout />
          </CartContextProvider>
        </MockedProvider>
      </ThemeProvider>
    );

    render(Wrapper);

    await act(async () => {
      await screen.rerender(Wrapper);
    });

    const webviewInstance = screen.getByTestId('com.usereserva:id/web_view_checkout');

    await act(async () => {
      await fireEvent(webviewInstance, 'onNavigationStateChange', { url: '/checkout/orderPlaced' });
    });

    expect(EventProvider.sendPushTags).toHaveBeenNthCalledWith(1, 'sendLastOrderData', { last_order_value: '35', last_purchase_date: '1621556195', total_orders_value: '35' });
    expect(EventProvider.sendPushTags).toHaveBeenNthCalledWith(2, 'sendAbandonedCartTags', { cart_update: '', product_image: '', product_name: '' });

    EventProvider.sendTrackEvent('fez-pedido', {
      id: '75791161034',
      action: 'fez-pedido',
      data: {
        dispositivo: 'ios',
        id_transacao: '123321',
        metodo_pagamento: 'Nubank',
        origem: 'app',
        quantidade_produtos: 1,
        subtotal: 35,
        total: 35,
        total_frete: 0,
      },
    });

    expect(logEventSpy).toHaveBeenCalled();
  });
});
