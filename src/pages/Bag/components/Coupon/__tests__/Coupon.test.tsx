import React from 'react';
import { theme } from '@usereservaapp/reserva-ui';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import { fireEvent, render } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import CouponComponent from '..';
import CartContextProvider from '../../../../../context/CartContext';
import useBagStore from '../../../../../zustand/useBagStore/useBagStore';
import subscribeNewsLetter from '../../../../../graphql/profile/newsLetter';

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

const bagInfos = {
  totalBagItemsPrice: 15,
  totalBagItems: 18,
  totalBagDiscountPrice: 0,
  totalBagDeliveryPrice: 14,
};

const renderCouponComponent = () => render(
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={apolloMocks}>
      <CartContextProvider>
        <CouponComponent />
      </CartContextProvider>
    </MockedProvider>
  </ThemeProvider>,
);

describe('Coupon Component', () => {
  it('should render the component with the initial state', () => {
    const { getByPlaceholderText, getByDisplayValue } = renderCouponComponent();

    const sellerCouponInput = getByPlaceholderText('Código do vendedor');
    expect(sellerCouponInput).toBeTruthy();
    fireEvent.changeText(sellerCouponInput, 'test coupon code');
    fireEvent(sellerCouponInput, 'blur');

    expect(getByDisplayValue('test coupon code')).toBeTruthy();

    const discountCouponInput = getByPlaceholderText('Cupom de desconto');
    expect(discountCouponInput).toBeTruthy();
  });

  it('should add seller and discount coupons', async () => {
    const { getByTestId, queryByTestId, getByPlaceholderText } = renderCouponComponent();

    const sellerInput = getByPlaceholderText('Código do vendedor');
    sellerInput.props.onChangeText('novo valor');

    const sellerCouponButton = getByTestId('com.usereserva:id/button_add_seller_Coupom');
    expect(sellerCouponButton).toBeTruthy();

    await act(async () => {
      await fireEvent.press(sellerCouponButton);
    });

    const discountInput = getByPlaceholderText('Cupom de desconto');
    discountInput.props.onChangeText('desconto');

    const discountCouponButton = getByTestId('com.usereserva:id/button_add_discount_Coupom');
    expect(discountCouponButton).toBeTruthy();

    await act(async () => {
      await fireEvent.press(discountCouponButton);
    });

    const sellerCouponBadge = queryByTestId('com.usereserva:id/CouponBadge_sellerCode');
    expect(sellerCouponBadge).toBeFalsy();
  });

  it('should apply seller and discount coupons', async () => {
    const dispatch = jest.fn();
    const couponInfos = {
      seller: {
        sellerName: 'testName',
        sellerCode: '123',
        sellerCouponError: false,
      },
      discount: {
        discountCode: '12345',
        discountCouponError: false,
      },
    };

    useBagStore.setState({
      couponInfo: couponInfos,
      bagInfos,
      topBarLoading: false,
      dispatch,
      getPriceWithDiscount: jest.fn(),

    });

    const { getByTestId } = renderCouponComponent();

    const ButtonSellerCode = getByTestId('com.usereserva:id/CouponBadge_discountCode');
    expect(ButtonSellerCode).toBeTruthy();
    await act(async () => {
      await fireEvent.press(ButtonSellerCode);
    });

    const discountCode = getByTestId('com.usereserva:id/CouponBadge_sellerCode');
    expect(discountCode).toBeTruthy();

    await act(async () => {
      await fireEvent.press(discountCode);
    });

    expect(dispatch).toHaveBeenNthCalledWith(1, { actionType: 'SET_TOP_BAR_LOADING', payload: { value: { topBarLoading: true } } });
  });
});
