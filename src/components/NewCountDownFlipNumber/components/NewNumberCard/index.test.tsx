import { render } from '@testing-library/react-native';
import React from 'react';
import { NewNumberCard } from '.';

const mockedProps = {
  clockBackgroundColor: '#1A1A1A',
  colorDivider: '#1A1A1A',
  number: '1',
  perspective: 250,
  previousNumber: '0',
  size: 100,
};

describe('New Number Card', () => {
  it('should render the new number card correctly', () => {
    const root = render(<NewNumberCard {...mockedProps} />);
    expect(root).toBeTruthy();
  });

  it('should render the upper card correctly', () => {
    const { getByTestId } = render(<NewNumberCard {...mockedProps} />);
    const upperCard = getByTestId(
      'com.usereserva:id/number_card_type_upper_card',
    );
    expect(upperCard).toBeTruthy();
  });

  it('should render the lower card correctly', () => {
    const { getByTestId } = render(<NewNumberCard {...mockedProps} />);
    const lowerCard = getByTestId(
      'com.usereserva:id/number_card_type_lower_card',
    );
    expect(lowerCard).toBeTruthy();
  });

  it('should render the front flip card correctly', () => {
    const { getByTestId } = render(<NewNumberCard {...mockedProps} />);
    const frontFlipCard = getByTestId(
      'com.usereserva:id/number_card_type_front_flip_card',
    );
    expect(frontFlipCard).toBeTruthy();
  });

  it('should render the front flip card with the current number', () => {
    const { getByTestId } = render(<NewNumberCard {...mockedProps} />);
    const frontFlipCard = getByTestId(
      'com.usereserva:id/flip_card_number_front',
    );
    expect(frontFlipCard.props.children).toBe(mockedProps.number);
  });

  it('should render the back flip card correctly', () => {
    const { getByTestId } = render(<NewNumberCard {...mockedProps} />);
    const backFlipCard = getByTestId(
      'com.usereserva:id/number_card__type_back_flip_card',
    );
    expect(backFlipCard).toBeTruthy();
  });

  it('should render the back flip card with the previous number', () => {
    const { getByTestId } = render(<NewNumberCard {...mockedProps} />);
    const backFlipCard = getByTestId('com.usereserva:id/flip_card_number_back');
    expect(backFlipCard.props.children).toBe(mockedProps.previousNumber);
  });
});
