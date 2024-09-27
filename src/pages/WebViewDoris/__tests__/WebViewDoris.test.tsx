import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { MockedProvider } from '@apollo/client/testing';
import { theme } from '../../../base/usereservappLegacy/theme';
import WebViewDoris from '..';

jest.mock('../../../zustand/useBagStore/useBagStore', () => ({
  useBagStore: () => ({
    orderformId: '123',
  }),
}));

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider addTypename={false}>
      <WebViewDoris />
    </MockedProvider>
  </ThemeProvider>
);

describe('WebViewDoris', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(Component);
  });
  it('Should snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should initial render webview', () => {
    const tree = screen.getByTestId('com.usereserva:id/web_view_doris');
    expect(tree).toBeOnTheScreen();
  });
});
