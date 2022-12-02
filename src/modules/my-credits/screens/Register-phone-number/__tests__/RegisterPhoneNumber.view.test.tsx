import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { RegisterPhoneNumberView } from '../RegisterPhoneNumber.view';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@danilomsou/reserva-ui';

const profile = {
  userId: '0',
  birthDate: null,
  document: 'document',
  email: 'teste@gmail.com',
  firstName: 'First',
  lastName: 'Last',
  homePhone: '00987654321',
};

const mockHandleRegister = jest.fn();

describe('RegisterPhoneNumberView', () => {
  test.skip('SHOULD render correctly WHEN isChangeNumber is true', () => {
    const { debug, getByText, getByPlaceholderText } = render(
      <ThemeProvider theme={theme}>
        <RegisterPhoneNumberView
          profile={profile}
          confirmPhone={false}
          isChangeNumber={true}
        />
      </ThemeProvider>
    );
    const titleIsChangeNumber = getByText('Atualizar telefone');
    const subtitleIsChangeNumber = getByText(
      'Digite seu número novo abaixo e continue para gerar seu QR Code.'
    );
    const inputPhoneNumber = getByPlaceholderText('(00) 00000-0000');
    const buttonRegister = getByText('CADASTRAR');
    expect(titleIsChangeNumber).toBeTruthy();
    expect(subtitleIsChangeNumber).toBeTruthy();
    expect(buttonRegister).toBeTruthy();
    expect(inputPhoneNumber).toBeTruthy();
  });
  test.skip('SHOULD render correctly WHEN isChangeNumber is false', () => {
    const { debug, getByText, getByPlaceholderText } = render(
      <ThemeProvider theme={theme}>
        <RegisterPhoneNumberView
          profile={profile}
          confirmPhone={false}
          isChangeNumber={false}
        />
      </ThemeProvider>
    );
    const titleRegisterPhone = getByText('Cashback em Lojas');
    const subtitleRegisterPhone = getByText(
      'Para utilizar o cashback em loja precisamos que mantenha o número de telefone atualizado.'
    );
    const subtitleQRCode = getByText(
      'Digite seu número abaixo e continue para gerar seu QR Code.'
    );
    const inputPhoneNumber = getByPlaceholderText('(00) 00000-0000');
    const buttonRegister = getByText('CADASTRAR');
    expect(titleRegisterPhone).toBeTruthy();
    expect(subtitleRegisterPhone).toBeTruthy();
    expect(subtitleQRCode).toBeTruthy();
    expect(buttonRegister).toBeTruthy();
    expect(inputPhoneNumber).toBeTruthy();
  });

  test.skip('SHOULD render correctly WHEN confirmPhone is true', () => {
    const { debug, getByText, getByPlaceholderText, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <RegisterPhoneNumberView
          profile={profile}
          confirmPhone={true}
          isChangeNumber={false}
        />
      </ThemeProvider>
    );
    debug();
    const titleConfirmPhone = getByText('Confirmar telefone');
    const subtitleConfirmPhon = getByText(
      'Digite abaixo o código que acabamos de enviar para seu telefone:'
    );
    const phoneNumber = getByTestId('phoneNumber');
    const confirmButton = getByText('CONFIRMAR');
    const resendCode = getByText('REENVIAR CÓDIGO EM ');
    expect(titleConfirmPhone).toBeTruthy();
    expect(subtitleConfirmPhon).toBeTruthy();
    expect(phoneNumber).toBeTruthy();
    expect(confirmButton).toBeTruthy();
    expect(resendCode).toBeTruthy();
  });

  test.skip('SHOULD send code to phone WHEN click on Register Button END isChangeNumber is true', () => {
    const { debug, getByText, getByPlaceholderText } = render(
      <ThemeProvider theme={theme}>
        <RegisterPhoneNumberView
          profile={profile}
          confirmPhone={false}
          isChangeNumber={true}
        />
      </ThemeProvider>
    );
    debug();
    const inputPhoneNumber = getByPlaceholderText('(00) 00000-0000');
    fireEvent.changeText(inputPhoneNumber, '27999999999');

    const RegisterButton = getByText('CADASTRAR');
    fireEvent.press(RegisterButton);
  });
});
