import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { theme } from '@usereservaapp/reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import { MockedProvider } from '@apollo/client/testing';
import PrimeLP from '../PrimeLP';
import { CartContext } from '../../../context/CartContext';
import { ApolloMockLPPrime } from '../__mocks__/primeLPMocks';
import * as useLandingPagePrimeQuery from '../../../base/graphql/generated';
import { mockPrimeData } from '../../../../__mocks__/PrimeLP.mock';

// MOCKS
const mockAddItemFn = jest.fn();
const mockHandleAddToCartPrime = jest.fn();
const mockProfile = {
  __typename: 'ProfileOutput',
  email: 'fulano@gmail.com',
  isPrime: true,
  addresses: [
    {
      __typename: 'ProfileAddressOutput',
      addressName: 'nuuzjm6dd2k',
      addressType: 'residential',
      city: 'Pindamonhangaba',
      complement: 'casa',
      country: 'BRA',
      id: 'nuuzjm6dd2k',
      neighborhood: 'Residencial Mantiqueira',
      number: '500',
      postalCode: '12446300',
      receiverName: 'Teste Receber',
      reference: '',
      state: 'SP',
      street: 'Rua Reinaldo de Oliveira Santos',
    },
  ],
  id: '316438e9-d825-44d2-8f0a-94ceea768ea3',
};

jest.mock('../../../zustand/useAuth/useAuthStore', () => ({
  useAuthStore: () => ({ profile: mockProfile }),
}));

jest.mock('../../../zustand/usePrimeStore/usePrimeStore', () => ({
  usePrimeStore: () => ({
    hasPrimeSubscriptionInCart: true,
    handleAddToCartPrime: mockHandleAddToCartPrime,
  }),
}));

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
      __typename: 'Query',
    },
    loading: false,
  } as any);

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={ApolloMockLPPrime} addTypename={false}>
      <CartContext.Provider value={
        { addItem: mockAddItemFn } as any
      }
      >
        <PrimeLP />
      </CartContext.Provider>
    </MockedProvider>
  </ThemeProvider>
);

describe('PrimeLP', () => {
  beforeEach(async () => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    await waitFor(() => render(TestingComponent));
  });

  it('should render properly', () => {
    const primeLP = screen.getByTestId('com.usereserva:id/PrimeLP_page');
    expect(primeLP).toBeOnTheScreen();
  });

  it('should match to snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should call onAddPrimeToCart when to press call to action button', async () => {
    const callToAction = screen.getByTestId(
      'com.usereserva:id/PrimeHero_call_to_action',
    );

    fireEvent.press(callToAction);

    await waitFor(() => {
<<<<<<< HEAD
      expect(mockAddItemFn).toBeCalled();
      expect(mockAddItemFn).toHaveBeenCalledWith({
        quantity: 1,
        itemId: `${mockPrimeData.skuId}`,
        seller: mockPrimeData.productSeller,
=======
      expect(mockHandleAddToCartPrime).toBeCalled();
      expect(mockHandleAddToCartPrime).toHaveBeenCalledWith({
        primeInformation: {
          __typename: 'PrimeDetailOutput',
          discountFrom: 499,
          discountPercentage: 20,
          installmentPrice: 25,
          installmentQty: 12,
          monthlyCashback: 25,
          productId: 35126,
          productSeller: '1',
        },
        addItem: mockAddItemFn,
>>>>>>> feature/prime
      });
    });
  });
});
