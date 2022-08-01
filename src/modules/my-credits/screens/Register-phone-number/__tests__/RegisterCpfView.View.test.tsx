import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { RegisterCpfView } from '../RegisterCpf.view';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@danilomsou/reserva-ui';

const cpf = '638.147.840-30'
const profile = {
    userId: '0',
    birthDate: null,
    document: 'document',
    email: 'teste@gmail.com',
    firstName: 'First',
    lastName: 'Last',
    homePhone: '00987654321'
}
const mockHandleNavigate = jest.fn();
const mockOnChangeText = jest.fn();
describe('RegisterCpfView', () => {
    test('SHOULD render correctly', () => {
        const { debug, getByText, getByPlaceholderText } = render(
            <ThemeProvider theme={theme}>
                <RegisterCpfView
                    valueCpf={cpf}
                    onChangeText={mockOnChangeText}
                    profile={profile}
                    navigateToVerifyNumber={mockHandleNavigate}
                />
            </ThemeProvider>
        );
        const title = getByText('Insira seu CPF e ative a sua carteira');
        const subtitle = getByText('O cashback e sua carteira Reserva precisam ficar atrelada a um número de CPF para você ter direito a todos os benefícios.');
        const input = getByPlaceholderText('Digite somente os números do CPF');
        const button = getByText('CADASTRAR');
        expect(title).toBeTruthy();
        expect(subtitle).toBeTruthy();
        expect(input).toBeTruthy();
        expect(button).toBeTruthy();
    });

    test('SHOULD register the user cpf', () => {
        const { getByText, getByPlaceholderText } = render(
            <ThemeProvider theme={theme}>
                <RegisterCpfView
                    valueCpf={cpf}
                    onChangeText={mockOnChangeText}
                    profile={profile}
                    navigateToVerifyNumber={mockHandleNavigate}
                />
            </ThemeProvider>
        );
        const input = getByPlaceholderText('Digite somente os números do CPF');
        const button = getByText('CADASTRAR');
        fireEvent.changeText(input, cpf);
        expect(input.props.value).toBe(cpf)
    });
    test('SHOULD call navigateToVerifyNumber WHEN to click on Register Button', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <RegisterCpfView
                    valueCpf={cpf}
                    onChangeText={mockOnChangeText}
                    profile={profile}
                    navigateToVerifyNumber={mockHandleNavigate}
                />
            </ThemeProvider>
        );
        const registerButton = getByText('CADASTRAR');
        fireEvent.press(registerButton);
        expect(mockHandleNavigate).toBeCalledTimes(1);
    });
})
