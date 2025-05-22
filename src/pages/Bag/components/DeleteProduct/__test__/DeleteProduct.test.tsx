import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { fireEvent, render } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import DeleteProductModal from '..';
import * as useBagStore from '../../../../../zustand/useBagStore/useBagStore';
import { theme } from '../../../../../base/usereservappLegacy/theme';

const CLOSE_MODAL_DELETE_PRODUCT_MOCK = jest.fn();
const UPDATE_PRODUCT_COUNT_MOCK = jest.fn();

describe('DeleteProductModal component', () => {
  it('should call action functions when the confirm button is pressed', async () => {
    jest.spyOn(useBagStore, 'useBagStore').mockReturnValue({
      actions: {
        CLOSE_MODAL_DELETE_PRODUCT: CLOSE_MODAL_DELETE_PRODUCT_MOCK,
        UPDATE_PRODUCT_COUNT: UPDATE_PRODUCT_COUNT_MOCK,
      },
      loadingModal: false,
      deleteProductModal: {
        show: true,
        deleteInfo: {
          index: 0,
          product: {
            id: '1294528',
            quantity: 1,
            price: 376.99,
            disableCounter: false,
            discountPercent: 0.5,
            imageSource: 'www.images.com/testes.png',
            name: 'Produto Para Teste P',
            isAddedAsGift: false,
            isAssinaturaSimples: false,
            isGift: false,
            isGiftable: true,
            isPrimeSubscription: false,
            itemColor: 'Blue',
            itemSize: 'M',
            key: 'Teste Delete Product',
            listPrice: 350.99,
            priceWithDiscount: 350.99,
            productId: '1294528',
            productTitle: 'Produto Para Teste P',
            seller: 'reserva',
            sellingPrice: 350.99,
            skuName: 'Teste',
            uniqueId: '123499831',
          },
        },
      },
    } as any);

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <DeleteProductModal />
      </ThemeProvider>,
    );

    const confirmButton = getByText('SIM');

    await act(() => fireEvent.press(confirmButton));

    expect(UPDATE_PRODUCT_COUNT_MOCK).toHaveBeenCalled();
    expect(CLOSE_MODAL_DELETE_PRODUCT_MOCK).toHaveBeenCalled();
  });
});
