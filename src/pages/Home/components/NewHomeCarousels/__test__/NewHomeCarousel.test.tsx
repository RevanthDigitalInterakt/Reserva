import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { MockedProvider } from '@apollo/client/testing';
import { NewHomeCarousels } from '..';
import { mockHomeCarouselQuery } from '../../../__test__/Home.mock';
import { theme } from '../../../../../base/usereservappLegacy/theme';

// MOCKS
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('react-native-background-timer', () => ({
  stopBackgroundTimer: jest.fn(),
  runBackgroundTimer: jest.fn(),
}));

jest.mock('../../../../../zustand/useHomeStore', () => ({
  useHomeStore: () => ({
    onLoad: () => {},
    carousels: mockHomeCarouselQuery.result.data.homeCarousels,
  }),
}));

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={[mockHomeCarouselQuery]} addTypename={false}>
      <NewHomeCarousels />
    </MockedProvider>
  </ThemeProvider>
);

describe('HomeCarousel', () => {
  beforeEach(async () => {
    jest.useFakeTimers({ legacyFakeTimers: true });
    render(TestingComponent);
  });

  it('should render properly', () => {
    const card = screen.getByTestId(
      'com.usereserva:id/default_carrousel_container',
    );
    expect(card).toBeOnTheScreen();
  });

  it('should match to snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
