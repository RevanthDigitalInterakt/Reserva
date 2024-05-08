import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { MockedProvider } from '@apollo/client/testing';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBar } from '../SearchBar';
import { theme } from '../../../base/usereservappLegacy/theme';
import CartContextProvider from '../../../context/CartContext';

describe('SearchBar component', () => {
  const onValueChangeMock = jest.fn();

  const component = (
    <ThemeProvider theme={theme}>
      <MockedProvider addTypename={false}>
        <CartContextProvider>
          <SearchBar onValueChange={onValueChangeMock} />
        </CartContextProvider>
      </MockedProvider>
    </ThemeProvider>
  );

  it('renders correctly', () => {
    render(component);
  });

  it('displays placeholder correctly', () => {
    const placeholderText = 'Search';
    const { getByPlaceholderText } = render(<SearchBar placeholder={placeholderText} />);
    expect(getByPlaceholderText(placeholderText)).toBeDefined();
  });
  it('calls onValueChange correctly when text is changed', () => {
    const placeholderText = 'Search';
    const { getByPlaceholderText } = render(<SearchBar
      onValueChange={onValueChangeMock}
      placeholder={placeholderText}
    />);
    const textInput = getByPlaceholderText('Search');
    fireEvent.changeText(textInput, 'test');
    expect(onValueChangeMock).toHaveBeenCalledWith('test');
  });
  it('calls onClickAutocomplete correctly when an autocomplete item is clicked', () => {
    const onClickAutocompleteMock = jest.fn();
    const autocompleteItems = ['item1', 'item2', 'item3'];
    const { getByText } = render(
      <SearchBar autocomplete={autocompleteItems} onClickAutocomplete={onClickAutocompleteMock} />,
    );
    const firstAutocompleteItem = getByText('item1');
    fireEvent.press(firstAutocompleteItem);
    expect(onClickAutocompleteMock).toHaveBeenCalledWith('item1');
  });
});
