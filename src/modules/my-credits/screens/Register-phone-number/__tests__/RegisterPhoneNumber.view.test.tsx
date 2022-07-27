import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TestRenderer from 'react-test-renderer';
import { Box, Button, Divider, Icon, theme, Typography } from '@danilomsou/reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import { screen } from '@testing-library/react-native'
import userEvent from '@testing-library/user-event';
import CodeInput from "../../../../../shared/components/CodeInput";

import { RegisterPhoneNumberView, RegisterPhoneNumberViewProps } from '../RegisterPhoneNumber.view';

const render = (props: RegisterPhoneNumberViewProps) => {
  const testRenderer = TestRenderer.create(<RegisterPhoneNumberView {...props} /> )
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
      expect(typography[0].props.children).toBe("Cashback em Lojas");
    })

    it('should fill the phone field', () => {
      const instanceOf = TestRenderer.create(<RegisterPhoneNumberView {...props} />).getInstance()
      instanceOf.handleChangePhone('99987654321')
      expect(instanceOf.state.phone).toEqual('99987654321')
    })

    it('should open a section to insert the code that the user received on the phone', () => {
      const instanceOf = TestRenderer.create(<RegisterPhoneNumberView {...props} />).getInstance()
      instanceOf.handleChangePhone('99987654321')
      expect(instanceOf.state.phone).toEqual('99987654321')
      let button = testInstance.findAllByType(Button);
      button[0].props.onPress();
      const typography = testInstance.findAllByType(Typography);
      expect(typography[4].props.children).toBe("Digite abaixo o código que acabamos de enviar para o número informado:");
    })

    it('should match the 6 digit code', () => {
      const newCode = '123456'
      const instanceOf = TestRenderer.create(<RegisterPhoneNumberView {...props} />).getInstance()
      instanceOf.setCode(newCode)
      expect(instanceOf.state.code).toEqual(newCode)
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
      isChangeNumber: false
    };
    const { testInstance } = render(props);

    it('verify if the screen is adapted to the isChangeNumber with false value', () => {
      const typography = testInstance.findAllByType(Typography);
      expect(typography[0].props.children).toBe("Atualizar telefone");
    })

    it('should fill the phone field', () => {
      const instanceOf = TestRenderer.create(<RegisterPhoneNumberView {...props} />).getInstance()
      instanceOf.handleChangePhone('99987654321')
      expect(instanceOf.state.phone).toEqual('99987654321')
    })

    it('should open a section to insert the code that the user received on the phone', () => {
      const instanceOf = TestRenderer.create(<RegisterPhoneNumberView {...props} />).getInstance()
      instanceOf.handleChangePhone('99987654321')
      expect(instanceOf.state.phone).toEqual('99987654321')
      let button = testInstance.findAllByType(Button);
      button[0].props.onPress();
      const typography = testInstance.findAllByType(Typography);
      expect(typography[2].props.children).toBe("Digite abaixo o código que acabamos de enviar para o número informado:");
    })

    it('should match the 6 digit code', () => {
      const newCode = '123456'
      const instanceOf = TestRenderer.create(<RegisterPhoneNumberView {...props} />).getInstance()
      instanceOf.setCode(newCode)
      expect(instanceOf.state.code).toEqual(newCode)
    })
  })
});
