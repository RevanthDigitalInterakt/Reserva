import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { UnavailableList } from '../UnavailableList';
import * as useBagStore from '../../../../../zustand/useBagStore/useBagStore';
import { currentOrderForm } from '../../../../../../__mocks__/mockResponseUnavailableList';
import { theme } from '../../../../../base/usereservappLegacy/theme';

const handleActiveModalDelete = jest.fn();

const makeSut = (
  <ThemeProvider theme={theme}>
    <UnavailableList />
  </ThemeProvider>
);

jest.spyOn(useBagStore, 'useBagStore').mockReturnValue({
  actions: {
    ACTIVE_MODAL_DELETE_PRODUCT: handleActiveModalDelete,
  },
  packageItems: [{ items: currentOrderForm.items }],
} as any);

describe('UnavailableList', () => {
  it('should render with success component', () => {
    const { getByTestId } = render(makeSut);
    const productItemUnavailable = getByTestId('com.usereserva:id/ProductUnavailableListItem');
    expect(productItemUnavailable).toBeTruthy();
  });
});
