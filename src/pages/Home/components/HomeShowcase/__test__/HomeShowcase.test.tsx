import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { MockedProvider } from '@apollo/client/testing';
import { theme } from '../../../../../base/usereservappLegacy/theme';
import { HomeShowcase } from '../HomeShowcase';

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <MockedProvider addTypename={false}>
      <HomeShowcase />
    </MockedProvider>
  </ThemeProvider>
);

describe('HomeShowcase', () => {
  it('snapshot', () => {
    render(TestingComponent);

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
