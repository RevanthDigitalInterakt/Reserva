import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import PrimeHero from '../PrimeHero';
import { mockPrimeData, addToCartMock } from '../../../../../../__mocks__/PrimeLP.mock';
import { theme } from '../../../../../base/usereservappLegacy/theme';

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
const mockGoBackFn = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBackFn }),
}));

jest.mock('../../../../../zustand/useAuth/useAuthStore', () => ({
  useAuthStore: () => ({ profile: mockProfile }),
}));

jest.mock('../../../../../hooks/usePrimeInfo', () => ({
  usePrimeInfo: () => ({
    isPrime: false,
  }),
}));

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <PrimeHero data={mockPrimeData} onAddToCart={addToCartMock} />
  </ThemeProvider>
);

describe('PrimeHero', () => {
  beforeEach(() => {
    render(TestingComponent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without error and match to snapshot', () => {
    const primeHero = screen.getByTestId(
      'com.usereserva:id/PrimeHero_component',
    );

    expect(primeHero).toBeOnTheScreen();
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should call to action button to be on the screen', async () => {
    const callToAction = screen.getByTestId(
      'com.usereserva:id/PrimeHero_call_to_action',
    );

    expect(callToAction).toBeOnTheScreen();
  });

  it('should call addPrimeToCart function', () => {
    const callToAction = screen.getByTestId(
      'com.usereserva:id/PrimeHero_call_to_action',
    );

    fireEvent.press(callToAction);

    expect(addToCartMock).toHaveBeenCalledTimes(1);
  });
});
