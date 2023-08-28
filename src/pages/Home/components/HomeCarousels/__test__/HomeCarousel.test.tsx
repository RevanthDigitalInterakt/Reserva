import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react-native';
import { theme } from '@usereservaapp/reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import { MockedProvider } from '@apollo/client/testing';
import HomeCarousels from '../HomeCarousels';
import { mockHomeCarouselQuery } from '../../../__test__/Home.mock';

// MOCKS
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('../../../../../zustand/useHomeStore', () => ({
  useHomeStore: () => ({
    onLoad: () => {},
    carousels: mockHomeCarouselQuery.result.data.homeCarousels
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
