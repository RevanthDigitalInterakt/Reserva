import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { MockedProvider } from '@apollo/client/testing';
import type { StackScreenProps } from '@react-navigation/stack';
import PrimeLP from '../PrimeLP';
import { ApolloMockLPPrime } from '../__mocks__/primeLPMocks';
import * as useLandingPagePrimeQuery from '../../../base/graphql/generated';
import { mockPrimeData } from '../../../../__mocks__/PrimeLP.mock';
import { theme } from '../../../base/usereservappLegacy/theme';
import type { RootStackParamList } from '../../../routes/StackNavigator';

type TNavigation = StackScreenProps<RootStackParamList, 'PrimeLP'>['navigation'];

const mockGoBackFn = jest.fn();
const mockHandleAddToCartPrime = jest.fn();
const mockedNavigate = jest.fn();
const mockAddListenerFn = jest.fn();

const navigationMock: Partial<TNavigation> = {
  navigate: mockedNavigate,
  goBack: mockGoBackFn,
  addListener: mockAddListenerFn,
};

const mockProfile = {
  __typename: 'ProfileOutput',
  email: 'fulano@gmail.com',
  isPrime: false,
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

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBackFn }),
}));

jest.mock('../../../zustand/usePrimeStore/usePrimeStore', () => ({
  usePrimeStore: () => ({
    hasPrimeSubscriptionInCart: false,
    handleAddToCartPrime: mockHandleAddToCartPrime,
  }),
}));

jest.mock('../../../hooks/usePrimeInfo', () => ({
  usePrimeInfo: () => ({
    onAddPrimeToCart: mockHandleAddToCartPrime,
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
    },
    loading: false,
  } as any);

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={ApolloMockLPPrime} addTypename={false}>
      <PrimeLP
        navigation={navigationMock as TNavigation}
        route={{
          name: 'PrimeLP',
          key: '',
        }}
      />
    </MockedProvider>
  </ThemeProvider>
);

describe('PrimeLP', () => {
  beforeEach(async () => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    render(TestingComponent);
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
      expect(mockHandleAddToCartPrime).toBeCalled();
      expect(mockHandleAddToCartPrime).toHaveBeenCalled();
    });
  });
});
