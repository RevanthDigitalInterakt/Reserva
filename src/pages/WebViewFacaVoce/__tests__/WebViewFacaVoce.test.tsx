import React from 'react';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { MockedProvider } from '@apollo/client/testing';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../../../base/usereservappLegacy/theme';
import WebViewFacaVoce from '..';

jest.mock('react-native-config', () => ({
  R2U_URL: 'https://mocked.url',
}));

jest.mock('../../../zustand/useTrackPageViewStore/useTrackPageViewStore', () => ({
  trackPageViewStore: {
    getState: jest.fn(() => ({
      sessionId: 'mockSessionId',
    })),
  },
}));

jest.mock('../../../zustand/useAuth/useAuthStore', () => ({
  useAuthStore: jest.fn(() => ({
    profile: { id: 'mockClientId' },
  })),
}));

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider addTypename={false}>
      <WebViewFacaVoce />
    </MockedProvider>
  </ThemeProvider>
);

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

describe('WebViewFacaVoce', () => {
  const navigate = jest.fn();
  const mockParams = {
    type: 'typemock',
    category: 'categorymock',
    custom: 'custommock',
    otherParams: 'value2',
  };

  beforeAll(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate });
    (useRoute as jest.Mock).mockReturnValue({ params: mockParams });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    render(Component);
  });

  it('Should match snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should initial render webview', async () => {
    await waitFor(() => {
      const tree = screen.getByTestId('com.usereserva:id/web_view_facavc');
      expect(tree).toBeTruthy();
    });
  });

  it('should set loading to false onLoadEnd', async () => {
    const webview = screen.getByTestId('com.usereserva:id/web_view_facavc');
    fireEvent(webview, 'onLoadEnd', { nativeEvent: { loading: false } });

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });
  });

  it('should handle onMessage event correctly', async () => {
    const webview = screen.getByTestId('com.usereserva:id/web_view_facavc');
    const messageEvent = {
      nativeEvent: {
        data: JSON.stringify({ event: 'facavcgotocart' }),
      },
    };

    fireEvent(webview, 'onMessage', messageEvent);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('BagScreen');
    });
  });

  it('should inject JavaScript correctly', () => {
    const webview = screen.getByTestId('com.usereserva:id/web_view_facavc');
    expect(webview.props.injectedJavaScriptBeforeContentLoaded).toContain('window.metadata');
  });

  it('should have the correct source uri', () => {
    const webview = screen.getByTestId('com.usereserva:id/web_view_facavc');
    expect(webview.props.source.uri).toBe('https://mocked.url?context=app&client_id=mockClientId&session_id==mockSessionId&orderform_id=&category=categorymock&custom=custommock&type=typemock');
  });
});
