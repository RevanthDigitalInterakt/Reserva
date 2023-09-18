import React from 'react';
import { theme } from '@usereservaapp/reserva-ui';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import { render, screen } from '@testing-library/react-native';
import CartContextProvider from '../../../../../../../context/CartContext';
import SectionProductsWithDiscount from '..';

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider addTypename={false}>
      <CartContextProvider>
        <SectionProductsWithDiscount />
      </CartContextProvider>
    </MockedProvider>
  </ThemeProvider>
);

describe('Section items with discount', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
  });
  it('snapshot', () => {
    render(Component);

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
