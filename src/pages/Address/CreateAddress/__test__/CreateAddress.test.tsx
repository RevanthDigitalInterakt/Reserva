import React from 'react';
import { theme } from '@usereservaapp/reserva-ui';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import { render, screen } from '@testing-library/react-native';
import CreateAddress from '../CreateAddress';
import CartContextProvider from '../../../../context/CartContext';

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider addTypename={false}>
      <CartContextProvider>
        <CreateAddress />
      </CartContextProvider>
    </MockedProvider>
  </ThemeProvider>
);

describe('Create Address', () => {
  it('snapshot', () => {
    render(Component);

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
