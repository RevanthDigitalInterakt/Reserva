import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import SkeletonBagFooter from '..';
import { theme } from '../../../../../base/usereservappLegacy/theme';

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
