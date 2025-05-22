import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../../base/usereservappLegacy/theme';
import { SelectBoxNormal } from '../SelectBoxNormal';

const onPressFn = jest.fn();

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <SelectBoxNormal
      installmentsNumber={4}
      installmentsPrice={64.5}
      isChecked={false}
      onPress={onPressFn}
      price={149.9}
    />
  </ThemeProvider>
);

describe('SelectBoxNormal', () => {
  beforeEach(() => render(TestingComponent));

  it('should render properly', () => {
    const selectBoxNormal = screen.getByTestId('com.usereserva:id/select_box_price_normal');

    expect(selectBoxNormal).toBeOnTheScreen();
  });

  it('should match with the snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should call onPressFn when select box is pressed', () => {
    const selectBoxNormal = screen.getByTestId('com.usereserva:id/select_box_price_normal');

    fireEvent.press(selectBoxNormal);

    expect(onPressFn).toHaveBeenCalled();
    expect(onPressFn).toHaveBeenCalledWith('priceNormal');
  });
});
