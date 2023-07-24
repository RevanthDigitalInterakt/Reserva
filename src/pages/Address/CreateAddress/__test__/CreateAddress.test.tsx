import React from 'react';
import { theme } from '@usereservaapp/reserva-ui';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';
import { render, screen } from '@testing-library/react-native';
import CreateAddress from '../CreateAddress';

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider addTypename={false}>
      <CreateAddress />
    </MockedProvider>
  </ThemeProvider>
);

describe('Create Address', () => {
  it('snapshot', () => {
    render(Component);

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
