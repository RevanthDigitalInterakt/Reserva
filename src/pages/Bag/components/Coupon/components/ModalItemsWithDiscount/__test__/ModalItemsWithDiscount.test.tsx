import React from 'react';
import { theme } from '@usereservaapp/reserva-ui';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import { render, screen } from '@testing-library/react-native';
import CartContextProvider from '../../../../../../../context/CartContext';
import ModalItemsWithDiscount from '..';

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider addTypename={false}>
      <CartContextProvider>
        <ModalItemsWithDiscount />
      </CartContextProvider>
    </MockedProvider>
  </ThemeProvider>
);

describe('Modal items with discount', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
  });
  it('snapshot', () => {
    render(Component);

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('render items in flatlist', () => {
    const { getByTestId } = render(Component);

    expect(getByTestId('com.usereserva:id/list_items_with_discount'));
  });
});
