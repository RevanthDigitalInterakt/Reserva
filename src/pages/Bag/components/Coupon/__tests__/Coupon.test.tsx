import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import { fireEvent, render } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import CouponComponent from '..';
import * as useBagStore from '../../../../../zustand/useBagStore/useBagStore';
import subscribeNewsLetter from '../../../../../graphql/profile/newsLetter';
import { theme } from '../../../../../base/usereservappLegacy/theme';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallBack: jest.fn(),
}));

const apolloMocks = [
  {
    request: {
      query: subscribeNewsLetter,
      variables: { email: 'example@test.com' },
    },
    result: {
      data: {
        subscribeNewsLetter: true,
      },
    },
  },
];

const ADD_SELLER_COUPON_FN = jest.fn(() => Promise.resolve({}));
const ADD_DISCOUNT_COUPON_FN = jest.fn(() => Promise.resolve({}));

const RenderCouponComponent = (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={apolloMocks}>
      <CouponComponent />
    </MockedProvider>
  </ThemeProvider>
);

describe('Coupon Component', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
  });

  it('should render the component with the initial state', async () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      RenderCouponComponent,
    );

    const sellerCouponInput = getByPlaceholderText('Código do vendedor');
    expect(sellerCouponInput).toBeTruthy();

    await act(async () => {
      await fireEvent.changeText(sellerCouponInput, 'test coupon code');
      await fireEvent(sellerCouponInput, 'blur');
    });

    expect(getByDisplayValue('test coupon code')).toBeTruthy();

    const discountCouponInput = getByPlaceholderText('Cupom de desconto');
    expect(discountCouponInput).toBeTruthy();
  });

  it('should apply seller coupon', async () => {
    jest.spyOn(useBagStore, 'useBagStore').mockReturnValue({
      actions: {
        ADD_SELLER_COUPON: ADD_SELLER_COUPON_FN,
      },
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
    } as any);

    const { getByTestId } = render(RenderCouponComponent);

    const ButtonSellerCode = getByTestId(
      'com.usereserva:id/button_add_seller_Coupon',
    );
    const TextInputSellerCode = getByTestId(
      'com.usereserva:id/text_field_add_seller_Coupon',
    );

    await act(async () => {
      await fireEvent.changeText(TextInputSellerCode, 'Cupom de Desconto');
    });

    fireEvent.press(ButtonSellerCode);

    expect(ADD_SELLER_COUPON_FN).toHaveBeenCalled();
  });

  it('should apply discount coupon', async () => {
    jest.spyOn(useBagStore, 'useBagStore').mockReturnValue({
      actions: {
        ADD_DISCOUNT_COUPON: ADD_DISCOUNT_COUPON_FN,
      },
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
    } as any);

    const { getByTestId } = render(RenderCouponComponent);

    const ButtonApplyDiscountCoupon = getByTestId(
      'com.usereserva:id/button_add_discount_Coupon',
    );

    const TextInputDiscountCode = getByTestId(
      'com.usereserva:id/text_field_add_discount_Coupon',
    );

    await act(async () => {
      await fireEvent.changeText(TextInputDiscountCode, 'Cupom de Desconto');
    });

    fireEvent.press(ButtonApplyDiscountCoupon);

    expect(ADD_DISCOUNT_COUPON_FN).toHaveBeenCalled();
  });
});
