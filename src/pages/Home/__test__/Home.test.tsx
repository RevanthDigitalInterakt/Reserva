import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@usereservaapp/reserva-ui';
import { MockedProvider } from '@apollo/client/testing';
import Home from '../Home';

import {
  mockHomeCarouselQuery, mockHomeConfigQuery, mockHomeCountdownQuery, mockHomeMediasQuery,
} from './Home.mock';

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider
      mocks={[
        mockHomeCountdownQuery,
        mockHomeCarouselQuery,
        mockHomeMediasQuery,
        mockHomeConfigQuery,
      ]}
      addTypename={false}
    >
      <Home />
    </MockedProvider>
  </ThemeProvider>
);

jest.mock('react-native-share', () => ({
  open: jest.fn(() => Promise.resolve()),
}));

jest.mock('../../../hooks/usePrimeInfo', () => ({
  usePrimeInfo: () => ({
  }),
}));

jest.mock('../../../zustand/useApolloFetchPolicyStore', () => ({
  useApolloFetchPolicyStore: () => ({
    initialized: true,
    getFetchPolicyPerKey: () => 0,
  }),
}));

jest.mock('../../../zustand/useConnectivityStore', () => ({
  useConnectivityStore: () => ({
    isConnected: true,
  }),
}));

jest.mock('../../../zustand/useHomeStore', () => ({
  useHomeStore: () => ({
    onLoad: () => {},
    medias: mockHomeMediasQuery.result.data.homeMedias,
    carousels: mockHomeCarouselQuery.result.data.homeCarousels,
  }),
}));

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders correctly', () => {
    render(Component);
    expect(screen).toMatchSnapshot();
  });

  it('should render flatlist correctly', () => {
    render(Component);
    const card = screen.getByTestId('com.usereserva:id/home_count_down_container');
    expect(card).toBeOnTheScreen();
  });

  it('should render banner properly', () => {
    render(Component);
    const card = screen.getByTestId('com.usereserva:id/banner_button_collection:1587');
    expect(card).toBeOnTheScreen();
  });
});
