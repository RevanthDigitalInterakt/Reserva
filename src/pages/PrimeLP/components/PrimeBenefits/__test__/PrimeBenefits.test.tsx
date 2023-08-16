import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { mockPrimeData } from '../../../../../../__mocks__/PrimeLP.mock';
import { theme } from '../../../../../base/usereservappLegacy/theme';
import PrimeBenefits from '../PrimeBenefits';

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <PrimeBenefits data={mockPrimeData} />
  </ThemeProvider>
);

describe('PrimeSubscribe', () => {
  beforeEach(() => {
    render(TestingComponent);
  });
  it('should render properly and match with snapshot', () => {
    const primeSubscribe = screen.getByTestId(
      'com.usereserva:id/PrimeBenefits_wrapper',
    );

    expect(primeSubscribe).toBeOnTheScreen();
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
