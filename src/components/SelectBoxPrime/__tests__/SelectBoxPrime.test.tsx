import React from 'react';
import { theme } from '@usereservaapp/reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { SelectBoxPrime } from '../SelectBoxPrime';

const onPressFn = jest.fn();

const selectBoxPrimeMock = {
  installmentsNumber: 4,
  installmentsPrice: 64.5,
  isChecked: false,
  onPress: onPressFn,
  savedValue: 29,
  price: 149.9,
};

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <SelectBoxPrime
      installmentsNumber={selectBoxPrimeMock.installmentsNumber}
      installmentsPrice={selectBoxPrimeMock.installmentsPrice}
      isChecked={selectBoxPrimeMock.isChecked}
      onPress={selectBoxPrimeMock.onPress}
      price={selectBoxPrimeMock.price}
      savedValue={selectBoxPrimeMock.savedValue}
    />
  </ThemeProvider>
);

describe('SelectBoxPrime', () => {
  beforeEach(() => render(TestingComponent));

  it('should render properly', () => {
    const selectBoxPrime = screen.getByTestId('com.usereserva:id/select_box_price_prime');

    expect(selectBoxPrime).toBeOnTheScreen();
  });

  it('should match with the snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should call onPressFn when select box is pressed', () => {
    const selectBox = screen.getByTestId('com.usereserva:id/select_box_price_prime');
    fireEvent.press(selectBox);

    expect(onPressFn).toHaveBeenCalled();
    expect(onPressFn).toHaveBeenCalledWith('pricePrime');
  });
});
