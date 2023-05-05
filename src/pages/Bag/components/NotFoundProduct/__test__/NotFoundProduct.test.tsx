import React from 'react';
import { theme } from '@usereservaapp/reserva-ui';
import { act } from '@testing-library/react-hooks';
import { ThemeProvider } from 'styled-components/native';
import { fireEvent, render } from '@testing-library/react-native';

import NotFoundProduct from '..';
import useBagStore from '../../../../../zustand/useBagStore/useBagStore';

describe('NotFoundProduct component', () => {
  it('should rende with calls handleSetNotFoundProduct when close button is pressed', async () => {
    const mockDispatch = jest.fn();

    await act(async () => {
      useBagStore.setState({ productNotFound: 'Product not found', dispatch: mockDispatch });
    });

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <NotFoundProduct />
      </ThemeProvider>,
    );
    const closeButton = getByTestId('com.usereserva:id/NotFoundProduct_setProduct');
    fireEvent.press(closeButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { value: { productNotFound: '' } },
      actionType: 'SET_PRODUCT_NOT_FOUND',
    });
  });
});
