import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import SearchWrapper from '../components/SearchWrapper';
import { isValidInput, formatInput } from '../components/SearchWrapper/SearchWrapper';
import { theme } from '../../../base/usereservappLegacy/theme';

const component = (
  <ThemeProvider theme={theme}>
    <MockedProvider addTypename={false}>
      <SearchWrapper />
    </MockedProvider>
  </ThemeProvider>
);

describe('SearchWrapper', () => {
  it('should render SearchWrapper component', () => {
    render(component);
  });

  it('should match with snapshot', () => {
    const { toJSON } = render(component);
    expect(toJSON()).toMatchSnapshot();
  });

  it('updates the term variable when the search term changes', () => {
    const { getByPlaceholderText } = render(component);
    const searchInput = getByPlaceholderText('Buscar');
    fireEvent.changeText(searchInput, 'Termo de busca');
    expect(searchInput.props.value).toBe('Termo de busca');
  });

  it('should be return valid input text', () => {
    const exampleValidTexts = ['  Text mock', 'Mock Test'];

    exampleValidTexts.map((text) => expect(isValidInput(text!)).toBeTruthy());
  });

  it('should be return invalid input text', () => {
    const exampleInvalidTexts = [' ', ''];

    exampleInvalidTexts.map((text) => expect(isValidInput(text!)).toBeFalsy());
  });

  it('should be return formatted input text', () => {
    const exampleInputText = '   Text Example';
    const exampleOutputText = 'Text Example';

    expect(formatInput(exampleInputText)).toEqual(exampleOutputText);
  });
});
