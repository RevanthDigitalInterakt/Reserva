import { render } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { theme } from '../../../base/usereservappLegacy/theme';
import { FlagDiscount } from '../FlagDiscount';

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <FlagDiscount
      discountTag={10}
    />
  </ThemeProvider>
);

describe('FlagDiscount', () => {
  it('should render the discount price', () => {
    const { getByText } = render(TestingComponent);

    const discount = getByText('10%');

    expect(discount).toBeDefined();
  });
});
