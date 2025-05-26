import { render } from '@testing-library/react-native';
import React from 'react';
import { Card } from '.';

const mockedProps = {
  type: 'upper' as unknown as 'upper' | 'lower',
  number: 1,
  testID: 'com.usereserva:id/number_card_type_upper_card',
};

describe('Card', () => {
  it('should render correctly', () => {
    const root = render(<Card {...mockedProps} />);
    expect(root).toBeTruthy();
  });

  it('should render the number correctly', () => {
    const { getByTestId } = render(<Card {...mockedProps} />);
    const number = getByTestId('com.usereserva:id/card_number');
    expect(number.props.children).toBe(mockedProps.number);
  });
});
