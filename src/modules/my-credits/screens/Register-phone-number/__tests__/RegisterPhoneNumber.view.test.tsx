import React from 'react';
import { TextInput } from 'react-native'
import TestRenderer from 'react-test-renderer';
import { Button, theme, Typography, TextField } from '@danilomsou/reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import { fireEvent } from '@testing-library/react-native'

import { RegisterPhoneNumberView, RegisterPhoneNumberViewProps } from '../RegisterPhoneNumber.view';

const render = (props: RegisterPhoneNumberViewProps) => {
  const testRenderer = TestRenderer.create(
    <ThemeProvider theme={theme}>
      <RegisterPhoneNumberView {...props} />
    </ThemeProvider>
  )
  const testInstance = testRenderer.root;

  return {
    testInstance,
    testRenderer,
  };
}

describe('RegisterPhoneNumber', () => {
  describe('isChangeNumber with false value', () => {
    const props: RegisterPhoneNumberViewProps = {
      profile: {
        userId: '0',
        birthDate: null,
        document: 'document',
        email: 'teste@gmail.com',
        firstName: 'First',
        lastName: 'Last',
        homePhone: '00987654321'
      },
      isChangeNumber: false
    };
    const { testInstance } = render(props);

    it('verify if the screen is adapted to the isChangeNumber with false value', () => {
      const typography = testInstance.findAllByType(Typography);
      expect(typography[1].props.children).toBe("Cashback em Lojas");
    })

    it('should fill the phone field', () => {
      const newPhone = '99987654321'
      const textField = testInstance.findByType(TextField)
      fireEvent.changeText(textField, newPhone)
      expect(textField.props.value).toBe(newPhone)
    })

    it('should open a section to insert the code that the user received on the phone', () => {
      const textField = testInstance.findByType(TextField)
      fireEvent.changeText(textField, '99987654321')
      expect(textField.props.value).toBe('99987654321')
      let button = testInstance.findAllByType(Button);
      button[1].props.onPress();
      const typography = testInstance.findAllByType(Typography);
      expect(typography[5].props.children).toBe("Confirme seu código");
    })

    it('should match the 6 digit code', () => {
      const newCode = '123456'
      const codeInput = testInstance.findAllByType(TextInput)
      fireEvent.changeText(codeInput[1], '123456')
      expect(codeInput[1].props.value).toBe(newCode)
    })
  })

  describe('isChangeNumber with true value', () => {
    const props: RegisterPhoneNumberViewProps = {
      profile: {
        userId: '0',
        birthDate: null,
        document: 'document',
        email: 'teste@gmail.com',
        firstName: 'First',
        lastName: 'Last',
        homePhone: '00987654321'
      },
      isChangeNumber: true
    };
    const { testInstance } = render(props);

    it('verify if the screen is adapted to the isChangeNumber with false value', () => {
      const typography = testInstance.findAllByType(Typography);
      expect(typography[1].props.children).toBe("Atualizar telefone");
    })

    it('should fill the phone field', () => {
      const newPhone = '99987654321'
      const textField = testInstance.findByType(TextField)
      fireEvent.changeText(textField, newPhone)
      expect(textField.props.value).toBe(newPhone)
    })

    it('should open a section to insert the code that the user received on the phone', () => {
      const textField = testInstance.findByType(TextField)
      fireEvent.changeText(textField, '99987654321')
      expect(textField.props.value).toBe('99987654321')
      let button = testInstance.findAllByType(Button);
      button[1].props.onPress();
      const typography = testInstance.findAllByType(Typography);
      expect(typography[4].props.children).toBe("Digite abaixo o código que acabamos de enviar para o número informado:");
    })

    it('should match the 6 digit code', () => {
      const newCode = '123456'
      const codeInput = testInstance.findAllByType(TextInput)
      fireEvent.changeText(codeInput[1], '123456')
      expect(codeInput[1].props.value).toBe(newCode)
    })
  })
})
