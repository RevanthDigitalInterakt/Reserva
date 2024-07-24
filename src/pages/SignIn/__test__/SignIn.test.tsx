import React from 'react';

import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { MockedProvider } from '@apollo/client/testing/react/MockedProvider';
import { ThemeProvider } from 'styled-components/native';
import SignInScreen from '../SignIn';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { theme } from '../../../base/usereservappLegacy/theme';

type TNavigation = StackScreenProps<RootStackParamList, 'LoginAlternative'>['navigation'];

const mockedNavigate = jest.fn();
const mockGoBackFn = jest.fn();
const mockAddListenerFn = jest.fn();

const navigationMock: Partial<TNavigation> = {
  navigate: mockedNavigate,
  goBack: mockGoBackFn,
  addListener: mockAddListenerFn,
};

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider addTypename={false}>
      <SignInScreen
        navigation={navigationMock as TNavigation}
        route={{
          name: 'LoginAlternative',
          key: '',
          params: { comeFrom: 'Profile' },
        }}
      />
    </MockedProvider>
  </ThemeProvider>
);

describe('Login', () => {
  it('snapshot', () => {
    render(Component);

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should not show error message when input values are valid', async () => {
    const { getByTestId } = render(Component);

    const emailInput = getByTestId('com.usereserva:id/login_input_email');
    const passwordInput = getByTestId('com.usereserva:id/login_input_password');

    const submitButton = getByTestId('com.usereserva:id/login_button_submit');

    await waitFor(() => {
      fireEvent.changeText(emailInput, 'teste@gmail.com');
    });

    await waitFor(() => {
      fireEvent.changeText(passwordInput, 'Teste@123');
    });

    await waitFor(() => {
      expect(submitButton).toBeTruthy();
    });

    await act(async () => {
      await fireEvent.press(getByTestId('com.usereserva:id/login_button_submit'));
    });

    fireEvent.press(submitButton);
  });
});
