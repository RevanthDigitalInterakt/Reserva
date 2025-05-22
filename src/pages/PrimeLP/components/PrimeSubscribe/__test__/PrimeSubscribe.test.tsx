import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import PrimeSubscribe from '../PrimeSubscribe';
import { mockPrimeData, addToCartMock } from '../../../../../../__mocks__/PrimeLP.mock';
import { theme } from '../../../../../base/usereservappLegacy/theme';

jest.mock('../../../../../zustand/useApolloFetchPolicyStore', () => ({
  useApolloFetchPolicyStore: () => ({
    getFetchPolicyPerKey: () => 'network-only',
  }),
}));

jest.mock('../../../../../hooks/usePrimeInfo', () => ({
  usePrimeInfo: () => ({
    isPrime: false,
  }),
}));

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <PrimeSubscribe data={mockPrimeData} onAddToCart={addToCartMock} />
  </ThemeProvider>
);

describe('PrimeSubscribe', () => {
  beforeEach(() => {
    render(TestingComponent);
  });
  it('should render properly and match with snapshot', () => {
    const primeSubscribe = screen.getByTestId('com.usereserva:id/prime_subscribe_component');

    expect(primeSubscribe).toBeOnTheScreen();
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should call addPrimeToCart function', () => {
    const callToAction = screen.getByTestId(
      'com.usereserva:id/prime_lp_bottom_button_add',
    );

    fireEvent.press(callToAction);

    expect(addToCartMock).toHaveBeenCalledTimes(1);
  });
});
