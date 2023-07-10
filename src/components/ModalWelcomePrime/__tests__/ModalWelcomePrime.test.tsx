import React from 'react';
import { theme } from '@usereservaapp/reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { ModalWelcomePrime } from '..';
import { ApolloMockLPPrime } from '../../../pages/PrimeLP/__mocks__/primeLPMocks';
import * as useLandingPagePrimeQuery from '../../../base/graphql/generated';
import { mockPrimeData } from '../../../../__mocks__/PrimeLP.mock';

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

const closeModal = jest.fn();

const TestingComponent = () => (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={ApolloMockLPPrime} addTypename={false}>
      <ModalWelcomePrime isVisible onClose={closeModal} />
    </MockedProvider>
  </ThemeProvider>
);

describe('ModalWelcomePrime', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
  });

  it('should render properly', () => {
    render(TestingComponent());

    const titleModal = screen.getByText('Bem vindo ao Prime');

    expect(titleModal).toBeOnTheScreen();
  });

  it('should match to snapshot', () => {
    render(TestingComponent());
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should call onPressFn when click in continue', () => {
    render(TestingComponent());

    const buttonContinue = screen.getByTestId('com.usereserva:id/modal_welcome_prime_continue');

    fireEvent.press(buttonContinue);

    expect(closeModal).toHaveBeenCalled();
  });
});
