import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import NotFoundProduct from '..';
import * as useBagStore from '../../../../../zustand/useBagStore/useBagStore';
import { theme } from '../../../../../base/usereservappLegacy/theme';

const mockClearProductNotFound = jest.fn();

jest.spyOn(useBagStore, 'useBagStore').mockReturnValue({
  actions: {
    CLEAR_PRODUCT_NOT_FOUND: mockClearProductNotFound,
  },
  productNotFound: 'Product not found',
} as any);

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <NotFoundProduct />
  </ThemeProvider>
);

describe('NotFoundProduct component', () => {
  beforeEach(() => {
    render(TestingComponent);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should match with the snapshot', () => {
    const notFoundProductComponent = screen.toJSON();

    expect(notFoundProductComponent).toMatchSnapshot();
  });

  it('should render with calls handleSetNotFoundProduct when close button is pressed', async () => {
    const closeButton = screen.getByTestId('com.usereserva:id/NotFoundProduct_setProduct');

    fireEvent.press(closeButton);

    expect(mockClearProductNotFound).toHaveBeenCalled();
  });
});
