import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@usereservaapp/reserva-ui';
import ModalDeleteAccount from '../ModalDeleteAccount';
// test e it são a mesma coisa

const mockHandleDeleteAccount = jest.fn();
const mockSetIsVisible = jest.fn();
describe('ModalDeleteAccount', () => {
  test.skip('SHOULD render correctly', () => {
    const { debug, getByText } = render(
      <ThemeProvider theme={theme}>
        <ModalDeleteAccount
          isVisible
          handleDeleteAccount={mockHandleDeleteAccount}
          setIsVisible={mockSetIsVisible}
        />
      </ThemeProvider>,
    );
    const titleModal = getByText('Tem certeza?');
    const subtitle = getByText(
      'Essa ação não pode ser desfeita. Confirme o código recebido para deletar sua conta permanentemente.',
    );
    expect(titleModal).toBeTruthy();
    expect(subtitle).toBeTruthy();
    // debug();
  });

  test.skip('SHOULD call handleDeleteAccount WHEN to click on Delete Button', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModalDeleteAccount
          isVisible
          handleDeleteAccount={mockHandleDeleteAccount}
          setIsVisible={mockSetIsVisible}
        />
      </ThemeProvider>,
    );
    const deleteButton = getByText('DELETAR PERMANENTEMENTE');
    fireEvent.press(deleteButton);
    expect(mockHandleDeleteAccount).toBeCalledTimes(1);
  });

  test.skip('SHOULD call setIsVisible WHEN to click on the back button', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModalDeleteAccount
          isVisible
          handleDeleteAccount={mockHandleDeleteAccount}
          setIsVisible={mockSetIsVisible}
        />
      </ThemeProvider>,
    );
    const backButton = getByText('VOLTAR');
    fireEvent.press(backButton);
    expect(mockSetIsVisible).toBeCalledTimes(1);
  });
});
