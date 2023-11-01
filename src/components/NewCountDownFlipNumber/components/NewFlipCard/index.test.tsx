import { render } from '@testing-library/react-native';
import React from 'react';
import { NewFlipCard } from '.';

const mockedProps = {
  setRef: jest.fn(),
  type: 'front' as unknown as 'front' | 'back',
  number: '1',
  testID: 'flip_number_hours',
};

describe('NewFlipCard', () => {
  it('should render correctly', () => {
    const root = render(<NewFlipCard {...mockedProps} />);
    expect(root).toBeTruthy();
  });

  it('should render correctly with type back', () => {
    const root = render(<NewFlipCard {...mockedProps} type="back" />);
    expect(root).toBeTruthy();
  });

  it('should render correctly with type front', () => {
    const root = render(<NewFlipCard {...mockedProps} type="front" />);
    expect(root).toBeTruthy();
  });

  it('should display the number correctly', () => {
    const { getByTestId } = render(<NewFlipCard {...mockedProps} />);
    const number = getByTestId('com.usereserva:id/flip_card_number_front');
    expect(number.props.children).toBe('1');
  });
});
