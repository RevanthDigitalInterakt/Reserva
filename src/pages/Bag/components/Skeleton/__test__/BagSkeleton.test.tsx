import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@usereservaapp/reserva-ui';
import BagSkeleton from '..';

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
