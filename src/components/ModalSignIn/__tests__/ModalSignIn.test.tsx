/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { render, screen } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { ModalSignIn } from '..';
import { ApolloMockLPPrime } from '../../../pages/PrimeLP/__mocks__/primeLPMocks';
import * as useLandingPagePrimeQuery from '../../../base/graphql/generated';
import { mockPrimeData } from '../../../../__mocks__/PrimeLP.mock';
import { theme } from '../../../base/usereservappLegacy/theme';

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

function TestingComponent() {
  return (
    <ThemeProvider theme={theme}>
      <MockedProvider mocks={ApolloMockLPPrime} addTypename={false}>
        <ModalSignIn isVisible onClose={closeModal} />
      </MockedProvider>
    </ThemeProvider>
  );
}

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
