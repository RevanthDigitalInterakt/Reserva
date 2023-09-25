import { render } from '@testing-library/react-native';
import React from 'react';
import { NewFlipNumber } from '.';

describe('NewFlipNumber', () => {
  it('should render correctly', () => {
    const root = render(<NewFlipNumber number="1" testID="flip-number" />);
    expect(root).toBeTruthy();
  });

  it('should display the next number correctly', () => {
    const { getByTestId } = render(
      <NewFlipNumber number="1" testID="flip-number" />,
    );
    const number = getByTestId('com.usereserva:id/flip_card_number_front');
    expect(number.props.children).toBe('02');
  });
});
