import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../../../../base/usereservappLegacy/theme';
import HomeTooltipGeolocation from '../HomeTooltipGeolocation';

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <HomeTooltipGeolocation />
  </ThemeProvider>
);

it('should match to snapshot', () => {
  render(TestingComponent);
  expect(screen.toJSON()).toMatchSnapshot();
});
