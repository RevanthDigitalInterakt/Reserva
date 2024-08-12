import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { MockedProvider } from '@apollo/client/testing';
import { OffersCarousels } from '../OffersCarousels';
import { mockHomeCarouselQuery } from '../../../../Home/__test__/Home.mock';
import { theme } from '../../../../../base/usereservappLegacy/theme';

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
    offersCarousels: mockHomeCarouselQuery.result.data.homeCarousels,
  }),
}));

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={[mockHomeCarouselQuery]} addTypename={false}>
      <OffersCarousels />
    </MockedProvider>
  </ThemeProvider>
);

describe('OffersCarousel', () => {
  render(Component);

  it('should render properly', () => {
    const card = screen.getByTestId(
      'com.usereserva:id/default_carrousel_container',
    );
    expect(card).toBeOnTheScreen();
  });

  it('should match to snapshot', () => {
    render(Component);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
