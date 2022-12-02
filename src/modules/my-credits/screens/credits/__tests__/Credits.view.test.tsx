import React from 'react';
import TestRenderer from 'react-test-renderer';
import {
  Box,
  Button,
  Divider,
  Icon,
  theme,
  Typography,
} from '@danilomsou/reserva-ui';
import { ThemeProvider } from 'styled-components/native';

import { CreditsView, CreditsViewProps } from '../Credits.view';
import { PriceCustom } from '../../../../Checkout/components/PriceCustom';

const render = (props: CreditsViewProps) => {
  const testRenderer = TestRenderer.create(
    <ThemeProvider theme={theme}>
      <CreditsView {...props} />
    </ThemeProvider>
  );
  const testInstance = testRenderer.root;

  return {
    testInstance,
    testRenderer,
  };
};

describe('CreditsView', () => {
  describe('when creditsBalance is not null and screenCashback is true', () => {
    const props: CreditsViewProps = {
      creditsBalance: Math.floor(Math.random() * 100),
      screenCashbackInStoreActive: true,
      handleNavigateToCashbackInStore: jest.fn(),
    };
    const { testInstance } = render(props);

    it.skip('should render a PriceCustom', () => {
      const priceCustom = testInstance.findByType(PriceCustom);
      const typography = testInstance.findAllByType(Typography);

      expect(typography[0].props.children).toBe('Meus créditos');
      expect(priceCustom.props.num).toBe(props.creditsBalance);
    });

    it.skip('should render a Button CashbackInStore and set onPress equal handleNavigate', () => {
      const typography = testInstance.findAllByType(Typography);
      const button = testInstance.findByType(Button);
      const icon = testInstance.findByType(Icon);

      expect(button.props.onPress).toBe(props.handleNavigateToCashbackInStore);
      expect(button.props.children).toBeTruthy();
      expect(typography[5].props.children).toBe('Cashback em Lojas');
      expect(icon.props.name).toBe('Cashback');
    });

    it.skip('should navigate to CashbackInStore when click on button', () => {
      const button = testInstance.findByType(Button);
      button.props.onPress();
      expect(props.handleNavigateToCashbackInStore).toHaveBeenCalled();
    });

    it.skip("should render a two Divider's", () => {
      const divider = testInstance.findAllByType(Divider);

      expect(divider).toHaveLength(2);
    });
  });
  describe('when all props required are passed', () => {
    const props: CreditsViewProps = {
      creditsBalance: 200,
      screenCashbackInStoreActive: true,
      handleNavigateToCashbackInStore: jest.fn(),
    };
    const { testRenderer } = render(props);

    it.skip('should match snapshot', () => {
      expect(testRenderer.toJSON()).toMatchSnapshot();
    });
  });
});
