import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { SearchButton } from '..';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

const mockProps = {
  onPress: mockedNavigate,
  placeholder: 'O que você procura hoje?',
};

describe('SearchButton', () => {
  it('should render correctly', () => {
    const root = render(<SearchButton {...mockProps} />);
    expect(root).toBeDefined();
  });

  it('should render correctly with placeholder', () => {
    const { queryByText } = render(<SearchButton {...mockProps} />);
    expect(queryByText(mockProps.placeholder)).toBeDefined();
  });

  it('should render correctly with onPress', () => {
    const { getByTestId } = render(<SearchButton {...mockProps} />);
    const button = getByTestId('search_button');
    fireEvent.press(button);
    expect(mockedNavigate).toHaveBeenCalled();
  });
});
