import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
  fireEvent, render, screen,
} from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import PricesSelectBoxes from '../PricesSelectBoxes';
import { ApolloMockLPPrime } from '../../../pages/PrimeLP/__mocks__/primeLPMocks';
import * as useLandingPagePrimeQuery from '../../../base/graphql/generated';
import { mockPrimeData } from '../../../../__mocks__/PrimeLP.mock';
import { theme } from '../../../base/usereservappLegacy/theme';

const selectedSizeMock = {
  __typename: 'ProductSizeOutput',
  availableQuantity: 140,
  currentPrice: 349,
  disabled: false,
  discountPercent: 0,
  ean: '0070649312',
  hasDiscount: false,
  installment: {
    __typename: 'ProductSizeInstallmentOutput',
    number: 5,
    value: 69.8,
  },
  itemId: '434252',
  listPrice: 349,
  seller: '1',
  size: 'M',
  prime: {
    installment: {
      number: 4,
      value: 69.8,
    },
    price: 279.2,
  },
};

const selectedSizeWithDiscountMock = {
  __typename: 'ProductSizeOutput',
  availableQuantity: 140,
  currentPrice: 349,
  disabled: false,
  discountPercent: 0,
  ean: '0070649312',
  hasDiscount: true,
  installment: {
    __typename: 'ProductSizeInstallmentOutput',
    number: 5,
    value: 69.8,
  },
  itemId: '434252',
  listPrice: 349,
  seller: '1',
  size: 'M',
  prime: {
    installment: {
      number: 4,
      value: 69.8,
    },
    price: 279.2,
  },
};

jest.mock('../../../zustand/useApolloFetchPolicyStore', () => ({
  useApolloFetchPolicyStore: () => ({
    getFetchPolicyPerKey: () => 'network-only',
  }),
}));

jest
  .spyOn(useLandingPagePrimeQuery, 'useLandingPagePrimeQuery')
  .mockReturnValue({
    data: {
      landingPagePrime: {
        ...mockPrimeData,
      },
    },
    loading: false,
  } as any);

function TestingComponent(selectedSize: any) {
  return (
    <ThemeProvider theme={theme}>
      <MockedProvider mocks={ApolloMockLPPrime} addTypename={false}>
        <PricesSelectBoxes selectedSize={selectedSize} />
      </MockedProvider>
    </ThemeProvider>
  );
}

describe('PricesSelectBoxes', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
  });

  it('should render properly', () => {
    render(TestingComponent(selectedSizeMock));

    const pricesSelectBoxes = screen.getByTestId(
      'com.usereserva:id/prices_select_boxes',
    );

    expect(pricesSelectBoxes).toBeOnTheScreen();
  });

  it('should match to snapshot', () => {
    render(TestingComponent(selectedSizeMock));
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should show text that prime is not cumulative if has discount', () => {
    const { rerender } = render(TestingComponent(selectedSizeWithDiscountMock));

    const text = screen.getByText(
      'O desconto do Prime não é cumulativo com produtos em liquidação.',
    );

    expect(text).toBeOnTheScreen();
  });

  it('should change selection when a price option is pressed', () => {
    const { rerender } = render(TestingComponent(selectedSizeMock));

    const selectBoxNormal = screen.getByTestId('com.usereserva:id/select_box_price_normal');
    const selectBoxPrime = screen.getByTestId('com.usereserva:id/select_box_price_prime');

    expect(selectBoxNormal).toBeOnTheScreen();
    expect(selectBoxPrime).toBeOnTheScreen();

    fireEvent.press(selectBoxNormal);

    // rerender component
    rerender(TestingComponent(selectedSizeMock));

    const checkedNormal = screen.getByTestId('com.usereserva:id/select_box_price_normal_checked');

    // verifying SelectBoxNormal is checked
    expect(checkedNormal).toBeOnTheScreen();

    fireEvent.press(selectBoxPrime);

    rerender(TestingComponent(selectedSizeMock));

    const ModalSignIn = screen.getByTestId('com.usereserva:id/modal_sign_in');

    expect(ModalSignIn).toBeOnTheScreen();
  });
});
