import React from 'react';
import { theme } from '@usereservaapp/reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import { fireEvent, render } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import DeleteProductModal from '..';
import useBagStore from '../../../../../zustand/useBagStore/useBagStore';

describe('DeleteProductModal component', () => {
  it('should render correctly', async () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <DeleteProductModal />
      </ThemeProvider>,
    );

    await act(async () => {
      await fireEvent.press(getByText('SIM'));
    });
    expect(useBagStore.getState().deleteProductModal.show).toBe(false);
  });
  it('should render correctly and update state correctly when confirm button is clicked', async () => {
    useBagStore.setState({
      showLoadingModal: false,
      deleteProductModal: {
        show: true,
        deleteInfo: {
          index: 0,
          product: {
            productTitle: 'test',
            itemColor: 'test',
            itemSize: 'test',
            isGift: false,
            isGiftable: false,
            imageSource: 'test',
            isAssinaturaSimples: false,
            priceWithDiscount: 12,
            discountPercent: 12,
            price: 12,
            productId: 'test',
            id: 'test',
            skuName: 'test',
            name: 'test',
            quantity: 12,
            seller: 'test',
            disableCounter: false,
            sellingPrice: 12,
            listPrice: 12,
            isAddedAsGift: false,
            uniqueId: 'test',
            key: 'test',
          },
        },
      },
      dispatch: jest.fn(),

    });
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <DeleteProductModal />
      </ThemeProvider>,
    );
    await act(async () => {
      await fireEvent.press(getByText('SIM'));
    });
    expect(useBagStore.getState().deleteProductModal.show).toBe(true);
  });
});
