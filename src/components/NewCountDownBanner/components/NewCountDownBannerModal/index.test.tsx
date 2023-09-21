import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NewCountDownBannerModal } from '.';
import { ClockScreenEnum } from '../../../../base/graphql/generated';

const setIsVisible = jest.fn();
const goToPromotion = jest.fn();

const mockProps = {
  data: {
    countdown: '2050-09-22T20:00:00.000-03:00',
    countdownStart: null,
    descriptionModal:
      'Exclusivo no app, válido por tempo limitado. Desconto aplicado no carrinho com o cupom: CALCADO40.',
    facets: [
      {
        key: 'productClusterIds',
        value: '420',
      },
    ],
    formattedValue: '227:25:18',
    reference: 'collection:420',
    subtitle: null,
    theme: {
      clockBackgroundColor: '#1A1A1A',
      colorBanner: '#000000',
      colorButton: '#4A4A4A',
    },
    title: 'Promoção de Polos',
    titleButton: 'APROVEITE',
    titleModal: 'Entenda as Regras',
    type: ClockScreenEnum.All,
    watchType: '3-Fundo preto com botão cinza',
  },
  isVisible: true,
  setIsVisible,
  goToPromotion,
};

describe('NewCountDownBannerModal', () => {
  it('should render correctly', () => {
    const root = render(<NewCountDownBannerModal {...mockProps} />);
    expect(root).toBeDefined();
  });

  it('should display the title correctly', () => {
    const { queryByTestId } = render(
      <NewCountDownBannerModal {...mockProps} />,
    );
    expect(
      queryByTestId('com.usereserva:id/check_the_rules_title_modal'),
    ).toHaveTextContent(mockProps.data.titleModal);
  });

  it('should display the description correctly', () => {
    const { queryByTestId } = render(
      <NewCountDownBannerModal {...mockProps} />,
    );
    expect(
      queryByTestId('com.usereserva:id/check_the_rules_description_modal'),
    ).toHaveTextContent(mockProps.data.descriptionModal);
  });

  it('should redirect to promotion on "CONTINUAR" button press', () => {
    const { getByTestId } = render(<NewCountDownBannerModal {...mockProps} />);
    const button = getByTestId(
      'com.usereserva:id/check_the_rules_button_promotion',
    );
    fireEvent.press(button);
    expect(goToPromotion).toHaveBeenCalled();
    expect(goToPromotion).toBeCalledTimes(1);
  });
});
