import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../../../../base/usereservappLegacy/theme';
import HomeModalGeolocation from '../HomeModalGeolocation';

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <HomeModalGeolocation />
  </ThemeProvider>
);

it('should match to snapshot', () => {
  render(TestingComponent);
  expect(screen.toJSON()).toMatchSnapshot();
});
