import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react-native';
import { theme } from '../../../../../base/usereservappLegacy/theme';
import CategoryComponent from '../CategoryComponent';
import { mockOffersCarouselsQuery } from './OffersCarousels.mock';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('../../../../../zustand/useHomeStore', () => ({
  useHomeStore: () => ({
    onLoad: () => {},
    offersCarousels: mockOffersCarouselsQuery.result.data.offersCarousels,
  }),
}));

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={[mockOffersCarouselsQuery]} addTypename={false}>
      <CategoryComponent />
    </MockedProvider>
  </ThemeProvider>
);
describe('CategoryComponent', () => {
  beforeEach(async () => {
    render(Component);
  });
  it('should match to snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should render items on screen', () => {
    const main = screen.getByTestId(
      'com.usereserva:id/category_main_component',
    );
    expect(main).toBeOnTheScreen();
  });
});
