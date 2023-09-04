import React from 'react';

import { render, screen } from '@testing-library/react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { MockedProvider } from '@apollo/client/testing/react/MockedProvider';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@usereservaapp/reserva-ui';
import { LoginScreen } from '../Login';
import type { RootStackParamList } from '../../../../routes/StackNavigator';
import CartContextProvider from '../../../../context/CartContext';

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
      <CartContextProvider>
        <LoginScreen
          navigation={navigationMock as TNavigation}
          route={{
            name: 'LoginAlternative',
            key: '',
            params: '',
          }}
        />
      </CartContextProvider>
    </MockedProvider>
  </ThemeProvider>
);

describe('Login', () => {
  it('snapshot', () => {
    render(Component);

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
