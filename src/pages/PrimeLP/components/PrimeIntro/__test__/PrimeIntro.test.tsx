import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { mockPrimeData } from '../../../../../../__mocks__/PrimeLP.mock';
import { theme } from '../../../../../base/usereservappLegacy/theme';
import PrimeIntro from '../PrimeIntro';

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <PrimeIntro data={mockPrimeData} />
  </ThemeProvider>
);

describe('PrimeIntro', () => {
  beforeEach(() => {
    render(TestingComponent);
  });

  it('should render properly and match to snapshot', () => {
    const primeIntro = screen.getByTestId('com.usereserva:id/PrimeIntro_wrapper');
    const primeIntroSnapshot = screen.toJSON();

    expect(primeIntro).toBeOnTheScreen();
    expect(primeIntroSnapshot).toMatchSnapshot();
  });
});
