import React from 'react';
import type { RouteProp } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import TestRenderer, { act } from 'react-test-renderer';
import { theme } from '@usereservaapp/reserva-ui';
import axios from 'axios';
import RonRedirectToBag, { IRonRedirectToBagProps } from './RonRedirectToBag';
import type { RootStackParamList } from '../../routes/StackNavigator';
import AuthContextProvider from '../../context/AuthContext';
import CartContextProvider from '../../context/CartContext';

type RouteAlias = RouteProp<RootStackParamList, 'RonRedirectToBag'>;

const orderFormId = '62731fbb53a84f08a8d228a3fbbbf088';

jest.useFakeTimers();

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  get: jest.fn((url) => {
    if (url.includes('widu')) {
      return {
        data: { destinyLink: `https://www.usereserva.com/checkout/?orderFormId=${orderFormId}#/cart` },
      };
    }

    if (url.includes('usereserva.io')) {
      return {
        request: { responseURL: 'https://vercel.usereserva.io/7q999r6b5q7' },
      };
    }

    return null;
  }),
}));

const navigation = { replace: jest.fn() };

const route = {
  params: { ronCode: 'kzpOBLIWVKYE' },
};

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <CartContextProvider>
      <AuthContextProvider>
        <RonRedirectToBag
          navigation={navigation as unknown as IRonRedirectToBagProps['navigation']}
          route={route as RouteAlias}
        />
      </AuthContextProvider>
    </CartContextProvider>
  </ThemeProvider>
);

// TODO check test broken
describe.skip('RonRedirectToBag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('default component should match snapshot', async () => {
    await act(async () => {
      const renderer = await TestRenderer.create(TestingComponent);

      act(() => { jest.runAllTimers(); });
      await act(async () => {});

      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });

  it('must load vercel response and redirect to BagScreen', async () => {
    await act(async () => {
      await TestRenderer.create(TestingComponent);

      act(() => { jest.runAllTimers(); });
      await act(async () => {});

      expect(axios.get).toHaveBeenCalledWith('https://usereserva.io/kzpOBLIWVKYE');
      expect(axios.get).toHaveBeenCalledWith('https://widu-bot-api.usenow.com.br/link/7q999r6b5q7');

      expect(axios.get).toHaveBeenCalledTimes(2);

      act(() => { jest.runAllTimers(); });
      await act(async () => {});

      expect(navigation.replace).toHaveBeenCalledWith(
        'BagScreen',
        { isProfileComplete: false, orderFormId },
      );
    });
  });
});
