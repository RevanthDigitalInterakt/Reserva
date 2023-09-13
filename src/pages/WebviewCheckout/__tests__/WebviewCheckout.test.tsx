import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import { theme } from '@usereservaapp/reserva-ui';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { act } from 'react-test-renderer';
import { CartContext } from '../../../context/CartContext';
import * as useBagStore from '../../../zustand/useBagStore/useBagStore';
import { mockCurrentOrderForm } from '../../Bag/__test__/__mocks__/mockCurrentOrderForm';
import WebviewCheckout from '../WebviewCheckout';
import EventProvider from '../../../utils/EventProvider';

import { mockPurchaseData } from './mockPurchaseData';
import * as vtexService from '../../../services/vtexService';
import * as useAsyncStorageProvider from '../../../hooks/useAsyncStorageProvider';

const mockUrlShipping = 'https://appqa.usereserva.com/checkout?orderFormId=$12345678/&test=2&webview=true&app=applojausereserva&savecard=true&utm_source=app/#/shipping';
const mockUrlPurchased = 'https://appqa.usereserva.com/checkout/orderPlaced?og=12345678';

const CREATE_NEW_ORDER_FORM_MOCK = jest.fn();

jest.mock('../../../utils/EventProvider');

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
  useRoute: () => ({ params: { url: mockUrlShipping } }),
}));

jest.mock('../../../hooks/usePrimeInfo', () => ({
  usePrimeInfo: () => ({
    isPrime: false,
  }),
}));

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <CartContext.Provider value={{ setOrderFormLegacy: jest.fn() } as any}>
      <WebviewCheckout />
    </CartContext.Provider>
  </ThemeProvider>
);

describe('WebviewCheckout', () => {
  let getAsyncStorageItemSpy: jest.SpyInstance;

  beforeEach(async () => {
    jest.spyOn(useBagStore, 'useBagStore').mockReturnValue({
      actions: {
        CREATE_NEW_ORDER_FORM: CREATE_NEW_ORDER_FORM_MOCK,
      },
      orderFormId: '12345678',
      loadingModal: false,
      appTotalizers: {
        delivery: 30.1,
        discount: 29.9,
        items: 1,
        total: 60,
        __typename: 'OrderformAppTotalizersOutput',
      },
      marketingData: {
        __typename: 'OrderformMarketingDataOutput',
        coupon: 'Promo',
        sellerCoupon: 'Promo',
        sellerCouponName: 'Promo Teste',
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
    } as any);

    render(TestingComponent);

    EventProvider.logEvent.mockClear();

    getAsyncStorageItemSpy = jest.spyOn(useAsyncStorageProvider, 'getAsyncStorageItem').mockImplementation((key) => {
      switch (key) {
        case '@RNSession:Ron':
          return Promise.resolve(true);
        case '@RNOrder:RonItems':
          return Promise.resolve(['35462']);
        case '@Dito:userRef':
          return Promise.resolve('12345678');
        default:
          return Promise.resolve(null);
      }
    });
  });

  afterEach(() => {
    getAsyncStorageItemSpy.mockRestore();
  });

  it('should initial render webview', () => {
    const tree = screen.getByTestId('com.usereserva:id/web_view_checkout');
    expect(tree).toBeOnTheScreen();
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should trigger event shipping completed', async () => {
    getAsyncStorageItemSpy.mockResolvedValue('123');

    const tree = screen.getByTestId('com.usereserva:id/web_view_checkout');

    const expectedData = {
      coupon: 'reserva10',
      currency: 'BRL',
      items: [],
      wbrand: 'reserva',
    };

    const payloadAddShippingInfo = JSON.stringify(
      {
        type: 'add_shipping_info',
        rawMessage: {
          data: expectedData,
        },
      },
    );

    tree.props.onMessage({
      nativeEvent: {
        data: payloadAddShippingInfo,
      },
    });

    expect(EventProvider.logEvent).toHaveBeenNthCalledWith(1, 'add_shipping_info', expectedData);

    const expectedData2 = {
      wbrand: 'reserva',
    };

    const payloadPageView = JSON.stringify(
      {
        type: 'page_view',
        rawMessage: {
          data: expectedData2,
        },
      },
    );

    tree.props.onMessage({
      nativeEvent: {
        data: payloadPageView,
      },
    });

    expect(EventProvider.logEvent).toHaveBeenNthCalledWith(2, 'page_view', expectedData2);
    expect(EventProvider.logEvent).toBeCalledTimes(2);
  });

  it('should trigger event purchase completed', async () => {
    jest.spyOn(vtexService, 'GetPurchaseData').mockResolvedValue({ data: mockPurchaseData });
    EventProvider.OneSignal.sendOutcomeWithValue = jest.fn();
    EventProvider.appsFlyer.logEvent = jest.fn();
    const tree = screen.getByTestId('com.usereserva:id/web_view_checkout');

    await act(async () => {
      await fireEvent(tree, 'onNavigationStateChange', {
        url: mockUrlPurchased,
      });
    });

    expect(EventProvider.sendTrackEvent).toHaveBeenNthCalledWith(1, 'fez-pedido-produto', {
      action: 'fez-pedido-produto',
      data: {
        categorias_produto: {
          1: 'Reserva', 259: 'Bazar', 260: 'Masculino', 262: 'Camisetas',
        },
        cor: 'MARINHO',
        id: '12345678',
        id_produto: '35462',
        id_transacao: '1356074561143',
        marca: 'RESERVA',
        nome_produto: 'CAMISETA ESTAMPADA CYBER MARINHO - G',
        origem: 'app',
        preco_produto: 89,
        quantidade: 1,
        tamanho: 'G',
      },
      id: '12345678',
    });

    expect(EventProvider.sendPushTags).toBeCalledWith('sendAbandonedCartTags', { cart_update: '', product_image: '', product_name: '' });

    expect(EventProvider.OneSignal.sendOutcomeWithValue).toBeCalledWith('Purchase', '89.00');

    expect(EventProvider.appsFlyer.logEvent).toBeCalledWith('af_purchase', {
      af_content: [{ id: '35462', price: 149, quantity: 1 }],
      af_content_id: ['355174'],
      af_content_type: 'product',
      af_currency: 'BRL',
      af_order_id: '12345678',
      af_price: '89.00',
      af_quantity: 1,
      af_receipt_id: '12345678',
      af_revenue: '149.00',
    });

    expect(EventProvider.logEvent).toHaveBeenNthCalledWith(1, 'ron_purchase', {
      coupon: 'coupon',
      currency: 'BRL',
      items: [{
        item_category: 'product', item_id: '35462', item_name: 'CAMISETA ESTAMPADA CYBER MARINHO - G', item_variant: 'MARINHO - G', price: 149, quantity: 1,
      }],
      transaction_id: '',
      value: 89,
      wbrand: 'RESERVA',
    });

    expect(EventProvider.logEvent).toHaveBeenNthCalledWith(2, 'page_view', { wbrand: 'RESERVA,' });

    expect(EventProvider.sendTrackEvent).toHaveBeenNthCalledWith(2, 'fez-pedido', {
      action: 'fez-pedido',
      data: {
        dispositivo: 'ios',
        id: '12345678',
        id_transacao:
          '1356074561143',
        metodo_pagamento: 'Pix',
        origem: 'app',
        quantidade_produtos: 1,
        subtotal: 149,
        total: 89,
        total_frete: 0,
      },
      id: '12345678',
    });

    expect(EventProvider.logPurchase).toBeCalledWith({
      affiliation: 'APP',
      coupon: 'coupon',
      currency: 'BRL',
      items: [
        {
          item_category: 'product',
          item_id: '35462',
          item_name: 'CAMISETA ESTAMPADA CYBER MARINHO - G',
          item_variant: 'MARINHO - G',
          price: 149,
          quantity: 1,
        },
      ],
      shipping: 0,
      tax: 0,
      transaction_id: '1356074561143',
      value: 89,
    });
  });
});
