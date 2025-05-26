import React from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { MockedProvider } from '@apollo/client/testing';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import HelpCenter from '../index';
import { theme } from '../../../base/usereservappLegacy/theme';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { helpCenterPageMocks } from './__mocks__/helpCenterPageMocks';

type TNavigation = StackScreenProps<RootStackParamList, 'HelpCenter'>['navigation'];

const mockedNavigate = jest.fn();
const mockGoBackFn = jest.fn();

const navigationMock: Partial<TNavigation> = {
  navigate: mockedNavigate,
  goBack: mockGoBackFn,
};

function Component() {
  return (
    <ThemeProvider theme={theme}>
      <MockedProvider mocks={helpCenterPageMocks} addTypename={false}>
        <HelpCenter
          navigation={navigationMock as TNavigation}
          route={{
            name: 'HelpCenter',
            key: '',
            params: { comeFrom: 'Menu' },
          }}
        />
      </MockedProvider>
    </ThemeProvider>
  );
}
describe('HelpCenter', () => {
  it('Should snapshot', async () => {
    await waitFor(() => {
      render(Component());
    });
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
