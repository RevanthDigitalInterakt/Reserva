import React from 'react';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../../base/usereservappLegacy/theme';
import AbandonedCart from '../AbandonedCart';
import CartContextProvider from '../../../context/CartContext';

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider addTypename={false}>
      <CartContextProvider>
        <AbandonedCart />
      </CartContextProvider>
    </MockedProvider>
  </ThemeProvider>
);

describe('AbandonedCart', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await waitFor(() => render(Component));
  });

  it('snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should must be the rendering component', () => {
    const mainContainer = screen.getAllByTestId('com.usereserva:id/abandoned_cart_container');
    const headerContainer = screen.getAllByTestId('com.usereserva:id/abandoned_cart_header_container');
    const carrousel = screen.getAllByTestId('com.usereserva:id/abandoned_cart_carrousel_content');
    const footerContainer = screen.getAllByTestId('com.usereserva:id/abandoned_cart_footer_container');

    expect(mainContainer).toBeTruthy();
    expect(headerContainer).toBeTruthy();
    expect(carrousel).toBeTruthy();
    expect(footerContainer).toBeTruthy();
  });
});
