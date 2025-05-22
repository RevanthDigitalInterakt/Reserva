import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { DarkButton } from '../index';

const mockOnPress = jest.fn();

describe('DarkButton', () => {
  it('should render correctly', () => {
    const root = render(<DarkButton
      onPress={mockOnPress}
      title="Test"
    />);
    expect(root).toBeTruthy();
  });

  it('should onpress work properly', () => {
    const root = render(<DarkButton
      onPress={mockOnPress}
      testID="test"
      title="Test"
    />);
    expect(root).toBeTruthy();
    const button = root.getByTestId('test');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should display title properly', () => {
    const root = render(<DarkButton
      onPress={mockOnPress}
      testID="test"
      title="Test"
    />);
    expect(root).toBeTruthy();
    const title = root.queryByText('Test');
    expect(title).toBeTruthy();
  });
});
