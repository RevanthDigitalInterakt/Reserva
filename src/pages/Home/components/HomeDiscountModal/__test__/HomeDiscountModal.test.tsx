import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react-native';
import { theme } from '@usereservaapp/reserva-ui';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import HomeDiscountModal from '../HomeDiscountModal';
import { HomeConfigDocument } from '../../../../../base/graphql/generated';

// MOCKS
const mockNavigate = jest.fn();

const mockHomeConfigQuery = {
  request: { query: HomeConfigDocument, variables: {} },
  result: {
    data: {
      homeConfig: {
        id: 'MainConfig',
        offersPage: 'collection:2772',
        discountCodeBar: {
          titleBar: 'Ganhe R$50 na sua Primeira Compra', colorBar: '#38A238', titleModal: '*Válido nas compras acima de R$199. Desconto aplicado automaticamente no carrinho. Não cumulativo com outras promoções. Não cumulativo nas camisetas com desconto.', descriptionModal: 'Use o cupom RSVAPP50', titleButton: 'Aproveite!', colorButton: '#38A238', shareMessage: null, coupon: null, __typename: 'ConfigDiscountBarOutput',
        },
        __typename: 'ConfigOutput',
      },
    },
  },
};

jest.mock('react-native-share', () => ({
  open: jest.fn(() => Promise.resolve()),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('../../../../../zustand/useHomeStore', () => ({
  useHomeStore: () => ({
    onLoad: () => {},
    discountBar: mockHomeConfigQuery.result.data.homeConfig.discountCodeBar
  }),
}));

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <MockedProvider
      mocks={[mockHomeConfigQuery]}
      addTypename={false}
    >
      <HomeDiscountModal />
    </MockedProvider>
  </ThemeProvider>
);

describe('HomeDiscountModal', () => {
  beforeEach(async () => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    render(TestingComponent);
  });

  it('should render properly', () => {
    const card = screen.getByTestId('com.usereserva:id/discount_code_modal_container');
    expect(card).toBeOnTheScreen();
  });

  it('should match to snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
