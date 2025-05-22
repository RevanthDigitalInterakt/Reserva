import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { act } from 'react-test-renderer';
import * as useBagStore from '../../../zustand/useBagStore/useBagStore';
import { mockCurrentOrderForm } from '../../Bag/__test__/__mocks__/mockCurrentOrderForm';
import WebviewCheckout from '../WebviewCheckout';
import EventProvider from '../../../utils/EventProvider';

import { mockPurchaseData } from './mockPurchaseData';
import * as vtexService from '../../../services/vtexService';
import * as useAsyncStorageProvider from '../../../hooks/useAsyncStorageProvider';
import { theme } from '../../../base/usereservappLegacy/theme';

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

jest.mock('../../../zustand/usePrimeStore/usePrimeStore', () => ({
  usePrimeStore: () => ({
    hasPrimeSubscriptionInCart: true,
    changeStateIsVisibleModalPrimeRemoved: jest.fn(),
  }),
}));

// Mocking the LoadingCheckout component
jest.mock('../../../components/LoadingCheckout/LoadingCheckout', () => 'LoadingCheckout');

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <WebviewCheckout />
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
      item_brand: 'reserva',
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
      item_brand: 'reserva',
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
        item_category: 'product',
        item_id: '35462',
        item_name: 'CAMISETA ESTAMPADA CYBER',
        item_variant: 'MARINHO - G',
        price: 149,
        quantity: 1,
      }],
      transaction_id: '',
      value: 89,
      item_brand: 'RESERVA',
    });

    expect(EventProvider.logPurchase).toBeCalledWith({
      affiliation: 'RESERVA',
      coupon: 'coupon',
      currency: 'BRL',
      items: [
        {
          item_category: 'product',
          item_id: '35462',
          item_name: 'CAMISETA ESTAMPADA CYBER',
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
