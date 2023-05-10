import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@usereservaapp/reserva-ui';
import SkeletonBagFooter from '..';

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <SkeletonBagFooter />
  </ThemeProvider>
);

describe('SkeletonBagFooter', () => {
  beforeEach(() => {
    render(TestingComponent);
  });

  it('should render without error and match to snapshot', () => {
    expect(screen.getByTestId('com.usereserva:id/skeletonBagFooter_bag')).toBeVisible();
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
