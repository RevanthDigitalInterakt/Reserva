import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import type { OrderFormQuery } from '../../../../../base/graphql/generated';
import { ProductUnavailableListItem } from '../ProductUnavailableListItem';
import { theme } from '../../../../../base/usereservappLegacy/theme';
import { DATA_FIRST, DATA_SECOND } from '../../../../../../__mocks__/mockResponseUnavailableListItem';

const handleDeleteMock = jest.fn();
const handleNavigateDetails = jest.fn();
const makeSut = (data: OrderFormQuery['orderForm']['packageItems'][0]['items'][0]) => (
  <ThemeProvider theme={theme}>
    <ProductUnavailableListItem
      data={data}
      onDelete={handleDeleteMock}
      onPress={handleNavigateDetails}
    />
  </ThemeProvider>
);
describe('ProductUnavailableListItem', () => {
  it('should be render with success cannotBeDelivered title', () => {
    const { getByText } = render(makeSut(DATA_FIRST));
    const titleSection = getByText(/indisponíveis para o cep atual/i);
    expect(titleSection).toBeTruthy();
  });
  it('should be render with success withoutStock title', () => {
    const { getByText } = render(makeSut(DATA_SECOND));
    const titleSection = getByText(/indisponíveis no estoque/i);
    expect(titleSection).toBeTruthy();
  });
  it('should be call function to delete a product', async () => {
    const { getByTestId } = render(makeSut(DATA_FIRST));
    const buttonRemoveProduct = getByTestId('com.usereserva:id/remove_product_unavailable_bag');
    await act(async () => {
      await fireEvent.press(buttonRemoveProduct);
    });
    expect(handleDeleteMock).toHaveBeenCalled();
  });
  it('should be call function to navigate product details', async () => {
    const { getByTestId } = render(makeSut(DATA_FIRST));
    const thumbnailProduct = getByTestId('com.usereserva:id/product_card_bag_3239branco-p_image');
    await act(async () => {
      await fireEvent.press(thumbnailProduct);
    });
    expect(handleNavigateDetails).toHaveBeenCalled();
  });
});
