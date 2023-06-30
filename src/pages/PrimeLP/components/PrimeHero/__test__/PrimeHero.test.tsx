import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@usereservaapp/reserva-ui';
import { fireEvent, render, screen } from '@testing-library/react-native';
import PrimeHero from '../PrimeHero';
import { mockPrimeData, addToCartMock } from '../../../../../../__mocks__/PrimeLP.mock';

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
