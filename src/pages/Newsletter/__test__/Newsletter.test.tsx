import React from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components/native';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react-native';
import Newsletter from '../Newsletter';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { theme } from '../../../base/usereservappLegacy/theme';

type TNavigation = StackScreenProps<RootStackParamList, 'Newsletter'>['navigation'];

const mockedNavigate = jest.fn();
const mockGoBackFn = jest.fn();

const navigationMock: Partial<TNavigation> = {
  navigate: mockedNavigate,
  goBack: mockGoBackFn,
};

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider addTypename={false}>
      <Newsletter
        navigation={navigationMock as TNavigation}
        route={{
          name: 'Newsletter',
          key: '',
          params: '',
        }}
      />
    </MockedProvider>
  </ThemeProvider>
);

describe('Newsletter', () => {
  it('should be match snapshot', async () => {
    render(Component);

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
