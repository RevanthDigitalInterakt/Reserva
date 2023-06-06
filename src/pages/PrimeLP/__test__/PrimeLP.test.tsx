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
      expect(mockAddItemFn).toBeCalled();
      expect(mockAddItemFn).toHaveBeenCalledWith({
        quantity: 1,
        itemId: `${mockPrimeData.productId}`,
        seller: mockPrimeData.productSeller,
      });
    });
  });
});
