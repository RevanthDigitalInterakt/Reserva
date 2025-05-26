import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { render, screen } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import Home from '../Home';
import { theme } from '../../../base/usereservappLegacy/theme';
import {
  mockHomeCarouselQuery,
  mockHomeConfigQuery,
  mockHomeCountdownQuery,
  mockHomeMediasQuery,
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
  usePrimeInfo: () => ({}),
}));

jest.mock('../../../utils/getApolloClient.ts', () => ({
  getApolloClient: () => ({
    mutate: jest.fn().mockResolvedValue({
      data: {
        trackPageView: {
          success: true,
        },
      },
    }),
  }),
}));

jest.mock('react-native-background-timer', () => ({
  stopBackgroundTimer: jest.fn(),
  runBackgroundTimer: jest.fn(),
}));

jest.mock('react-native-tracking-transparency', () => ({
  requestTrackingPermission: jest.fn(() => Promise.resolve()),
  getTrackingStatus: jest.fn(() => Promise.resolve('authorized')),
}));

jest.mock('../../../zustand/useApolloFetchPolicyStore', () => ({
  useApolloFetchPolicyStore: () => ({
    initialized: true,
    getFetchPolicyPerKey: () => 0,
  }),
}));

jest.mock('react-native-webview', () => {
  // eslint-disable-next-line global-require
  const { View } = require('react-native');
  return {
    WebView: View,
  };
});

jest.mock('../../../zustand/useHomeStore', () => ({
  useHomeStore: () => ({
    onLoad: () => {},
    medias: mockHomeMediasQuery.result.data.homeMedias,
    carousels: mockHomeCarouselQuery.result.data.homeCarousels,
  }),
}));

jest.mock('../../../zustand/useAuth/useAuthStore', () => ({
  useAuthStore: () => ({
    initialized: true,
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
    const card = screen.getByTestId(
      'com.usereserva:id/home_count_down_container',
    );
    expect(card).toBeOnTheScreen();
  });

  it('should render banner properly', () => {
    render(Component);
    const card = screen.getByTestId(
      'com.usereserva:id/banner_button_collection:1587',
    );
    expect(card).toBeOnTheScreen();
  });
});
