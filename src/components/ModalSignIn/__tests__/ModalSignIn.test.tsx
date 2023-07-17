import React from 'react';
import { theme } from '@usereservaapp/reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import { render, screen } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { ModalSignIn } from '..';
import { ApolloMockLPPrime } from '../../../pages/PrimeLP/__mocks__/primeLPMocks';
import * as useLandingPagePrimeQuery from '../../../base/graphql/generated';
import { mockPrimeData } from '../../../../__mocks__/PrimeLP.mock';
import { CartContext } from '../../../context/CartContext';

jest.mock('../../../zustand/useApolloFetchPolicyStore', () => ({
  useApolloFetchPolicyStore: () => ({
    getFetchPolicyPerKey: () => 'network-only',
  }),
}));

jest.mock('../../../zustand/useDitoStore', () => ({
  useDitoStore: () => ({
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

const closeModal = jest.fn();

const TestingComponent = () => (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={ApolloMockLPPrime} addTypename={false}>
      <CartContext.Provider value={{ profile: { isPrime: true } } as any}>
        <ModalSignIn isVisible onClose={closeModal} />
      </CartContext.Provider>
    </MockedProvider>
  </ThemeProvider>
);

describe('ModalSignIn', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
  });

  it('should render properly', () => {
    render(TestingComponent());

    const titleModal = screen.getByTestId('com.usereserva:id/modal_sign_in_title');

    expect(titleModal).toBeOnTheScreen();
  });

  it('should match to snapshot', () => {
    render(TestingComponent());
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
