import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@usereservaapp/reserva-ui';
import DeleteAccountComponent from './DeleteAccountComponent';

jest.useFakeTimers();

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <DeleteAccountComponent userId="123" />
  </ThemeProvider>
);

describe('DeleteAccountComponent', () => {
  it('renders without error and match snapshot', async () => {
    await act(async () => {
      const renderer = await TestRenderer.create(TestingComponent);

      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });

  it('should show delete account modal', async () => {
    await act(async () => {
      const renderer = await TestRenderer.create(TestingComponent);

      const instance = renderer.root;

      const $modal = instance.findByProps({ testID: 'modaldeleteaccount_container' });
      const $buttonShowModal = instance.findByProps({ testID: 'deleteaccount_button_remove' });

      expect($modal.props.isVisible).toBeFalsy();

      $buttonShowModal.props.onPress();

      expect($modal.props.isVisible).toBeTruthy();
    });
  });
});
