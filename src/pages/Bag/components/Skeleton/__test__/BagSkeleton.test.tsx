import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import BagSkeleton from '..';
import { theme } from '../../../../../base/usereservappLegacy/theme';

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <BagSkeleton />
  </ThemeProvider>
);

describe('BagSkeleton', () => {
  beforeEach(() => {
    render(TestingComponent);
  });

  it('should render properly and match with snapshot', () => {
    expect(screen.getByTestId('com.usereserva:id/BagSkeleton')).toBeVisible();
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
