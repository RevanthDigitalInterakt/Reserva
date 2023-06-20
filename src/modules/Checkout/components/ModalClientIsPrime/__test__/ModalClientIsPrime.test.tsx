import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@usereservaapp/reserva-ui';

import { fireEvent, render, screen } from '@testing-library/react-native';
import { ModalClientIsPrime } from '../ModalClientIsPrime';

// Mocks
const userNameMock = 'User teste';
const onBackDropPressMock = jest.fn();

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <ModalClientIsPrime
      isVisible
      firstName={userNameMock}
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

  it('should render userName passed through props', () => {
    const userName = screen.getByText(userNameMock);

    expect(userName).toBeOnTheScreen();
  });

  it('should call onBackdropPress function when button is pressed', () => {
    const button = screen.getByTestId(
      'com.usereserva:id/Modal_Client_Is_Prime_Modal_Button',
    );

    fireEvent.press(button);

    expect(onBackDropPressMock).toBeCalled();
  });
});
