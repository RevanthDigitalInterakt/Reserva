import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { fireEvent, render, screen } from '@testing-library/react-native';
import { ModalClientIsPrime } from '../ModalClientIsPrime';
import { theme } from '../../../base/usereservappLegacy/theme';

const onBackDropPressMock = jest.fn();

jest.mock('../../../zustand/useAuthModalStore', () => ({
  useAuthStore: () => ({
    profile: {
      firstName: 'name',
      email: 'email@test.com',
    },
  }),
}));

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <ModalClientIsPrime
      isVisible
      onBackdropPress={onBackDropPressMock}
    />
  </ThemeProvider>
);

describe('ModalClientIsPrime', () => {
  beforeEach(() => {
    render(TestingComponent);
  });
  it('should render properly', () => {
    const modal = screen.getByTestId('com.usereserva:id/Modal_Client_Is_Prime');

    expect(modal).toBeOnTheScreen();
  });

  it('should match with snapshot', () => {
    const modalToJSON = screen.toJSON();

    expect(modalToJSON).toMatchSnapshot();
  });

  it('should call onBackdropPress function when button is pressed', () => {
    const button = screen.getByTestId(
      'com.usereserva:id/Modal_Client_Is_Prime_Modal_Button',
    );

    fireEvent.press(button);

    expect(onBackDropPressMock).toBeCalled();
  });
});
