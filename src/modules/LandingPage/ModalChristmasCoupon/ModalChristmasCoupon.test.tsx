import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { theme } from '@usereservaapp/reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import ModalChristmasCoupon from './ModalChristmasCoupon';
import ModalChristmasCouponForm from './ModalChristmasCouponForm';

jest.mock('../../../hooks/useMasterdataProvider', () => () => ({
  onCheckChristmasModalVisibility: () => Promise.resolve({
    showModal: true,
    title: 'Titulo do modal',
    titleButton: 'Submit',
    subtitle: [],
    fineline: '*Confira as regras',
  }),
}));

jest.useFakeTimers();

const onClose = jest.fn();

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <ModalChristmasCoupon isVisible onClose={onClose} orderId="123456" />
  </ThemeProvider>
);

describe('ModalChristmasCouponTest', () => {
  it('renders without error and match snapshot', async () => {
    await act(async () => {
      const renderer = await TestRenderer.create(TestingComponent);

      act(() => { jest.runAllTimers(); });
      await act(async () => {});

      const instance = renderer.root;

      act(() => { jest.runAllTimers(); });
      await act(async () => {});

      const $modal = instance.findByType(ModalChristmasCouponForm);
      const $title = instance.findByProps({ testID: 'christmascouponform_title' });

      expect($title.props.children).toBe('Titulo do modal');
      expect($modal).toBeTruthy();
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });

  it('hides the modal when onClose is called', async () => {
    await act(async () => {
      const renderer = await TestRenderer.create(TestingComponent);

      act(() => { jest.runAllTimers(); });
      await act(async () => {});

      const instance = renderer.root;

      act(() => { jest.runAllTimers(); });
      await act(async () => {});

      const modal = instance.findByProps({ testID: 'modalchristmas_container' });
      expect(modal.props.isVisible).toBeTruthy();

      const buttonClose = instance.findByProps({ testID: 'christmascouponform_button_close' });
      buttonClose.props.onPress();

      expect(onClose).toHaveBeenCalled();
    });
  });
});
