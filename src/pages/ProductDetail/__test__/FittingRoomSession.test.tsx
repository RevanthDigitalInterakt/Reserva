import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import FittingRoomSession from '../components/FittingRoomSession';
import ButtonDoris from '../components/FittingRoomSession/components/ButtonDoris';

jest.mock('../../../zustand/useBagStore/useBagStore', () => ({
  useBagStore: () => ({
    orderformId: '123',
  }),
}));

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

const categoryTreeValid = [{ name: 'Reserva' }, { name: 'Masculino' }, { name: 'polos' }];

const productIdValid = '45660';

const eanValid = '0082519026';

const Component = (
  <FittingRoomSession
    categoryTree={categoryTreeValid}
    productEan={eanValid}
    productId={productIdValid}
    isValidProductDoris
  />
);

describe('FittingRoomSession', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should snapshot', () => {
    render(Component);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should initial render component', () => {
    const { getByTestId } = render(Component);
    const component = getByTestId('com.usereserva:id/fitting_room_session');
    const componentBtnDoris = getByTestId('com.usereserva:id/component_button_doris');
    const btnDoris = getByTestId('com.usereserva:id/button_doris');
    const txtNew = getByTestId('com.usereserva:id/txt_new');
    const buttonSizeGuide = getByTestId('com.usereserva:id/size_guides_button_product_details');
    const footerDoris = getByTestId('com.usereserva:id/footer_doris');

    expect(component).toBeOnTheScreen();
    expect(componentBtnDoris).toBeOnTheScreen();
    expect(btnDoris).toBeOnTheScreen();
    expect(txtNew).toBeOnTheScreen();
    expect(buttonSizeGuide).toBeOnTheScreen();
    expect(footerDoris).toBeOnTheScreen();
  });

  it('should navigation to webview doris', () => {
    const { getByTestId } = render(<ButtonDoris
      productEan={eanValid}
      enabledBtnFullDoris
    />);

    const btnDoris = getByTestId('com.usereserva:id/button_doris');

    fireEvent.press(btnDoris);

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });

  it('should not navigation to webview doris', () => {
    const { getByTestId } = render(<ButtonDoris
      productEan=""
      enabledBtnFullDoris
    />);

    const btnDoris = getByTestId('com.usereserva:id/button_doris');

    fireEvent.press(btnDoris);

    expect(mockedNavigate).toHaveBeenCalledTimes(0);
    expect(mockedNavigate).not.toHaveBeenCalled();
  });
});
