import { MockedProvider } from '@apollo/client/testing';
import {
  render,
  screen,
} from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { theme } from '../../../../../base/usereservappLegacy/theme';
import { mockHomeCarouselQuery } from '../../../__test__/Home.mock';
import HomeCarousels from '../HomeCarousels';

// MOCKS
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('../../../../../zustand/useHomeStore', () => ({
  useHomeStore: () => ({
    onLoad: () => {},
    carousels: mockHomeCarouselQuery.result.data.homeCarousels,
  }),
}));

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <MockedProvider
      mocks={[mockHomeCarouselQuery]}
      addTypename={false}
    >
      <HomeCarousels />
    </MockedProvider>
  </ThemeProvider>
);

describe('HomeCarousel', () => {
  beforeEach(async () => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    render(TestingComponent);
  });

  it('should render properly', () => {
    const card = screen.getByTestId('com.usereserva:id/default_carrousel_container');
    expect(card).toBeOnTheScreen();
  });

  it('should match to snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
