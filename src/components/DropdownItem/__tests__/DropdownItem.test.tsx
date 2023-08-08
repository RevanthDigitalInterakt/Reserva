import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react-native';
import DropdownItem from '../DropdownItem';
import { theme } from '../../../base/usereservappLegacy/theme';

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <DropdownItem body="Here goes the text" title="Testing this component" />
  </ThemeProvider>
);

describe('DropdownItem', () => {
  beforeEach(() => render(TestingComponent));

  it('should render component properly', () => {
    const dropdownComponent = screen.getByTestId(
      'com.usereserva:id/dropdown_item_presseble_title',
    );

    expect(dropdownComponent).toBeOnTheScreen();
  });

  it('should show the content when the title is pressed', async () => {
    const dropdownTitle = screen.getByTestId(
      'com.usereserva:id/dropdown_item_presseble_title',
    );

    fireEvent.press(dropdownTitle);

    await waitFor(() => {
      const content = screen.getByTestId('com.usereserva:id/dropdown_item_content');
      expect(content).toBeOnTheScreen();
    });
  });
});
