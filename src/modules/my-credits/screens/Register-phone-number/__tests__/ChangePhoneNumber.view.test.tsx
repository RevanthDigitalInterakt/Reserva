import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Box, Button, Divider, Icon, theme, Typography } from '@danilomsou/reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import { screen } from '@testing-library/react-native'
import userEvent from '@testing-library/user-event';
import CodeInput from "../../../../../shared/components/CodeInput";

import { ChangePhoneNumberView, ChangePhoneNumberViewProps } from '../../Register-phone-number/ChangePhoneNumber.view';

const render = (props: ChangePhoneNumberViewProps) => {
  const testRenderer = TestRenderer.create(<ChangePhoneNumberView {...props} />)
  const testInstance = testRenderer.root;

  return {
    testInstance,
    testRenderer,
  };
}

describe('Cashback', () => {
  const props: ChangePhoneNumberViewProps = {
    profile: {
      userId: '0',
      birthDate: null,
      document: 'document',
      email: 'teste@gmail.com',
      firstName: 'First',
      lastName: 'Last',
      homePhone: '00987654321'
    },
    navigateToRegisterPhoneNumber: jest.fn()
  };
  const { testInstance } = render(props);

  it('should show the number when it is already registered', () => {
    const typography = testInstance.findAllByType(Typography);
    expect(typography[2].props.children).toBe(props.profile.homePhone.slice(3).replace(/(\d{2})(\d{5})(\d{4})/, "($1)*****-$3"));
  })
});
