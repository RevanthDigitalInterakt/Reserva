import { ThemeProvider } from 'styled-components/native';
import { theme } from '@usereservaapp/reserva-ui';
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import FormEditProfileComponent from '../FormEditProfileComponent';

const FormEditProfileProps = {
  handleModal: jest.fn(),
  showChangeFileModal: false,
  handleToogleLoading: jest.fn(),
};

const TestingComponentRegisterFalse = (
  <ThemeProvider theme={theme}>
    <FormEditProfileComponent isRegister={false} {...FormEditProfileProps} />
  </ThemeProvider>
);

const TestingComponentRegisterTrue = (
  <ThemeProvider theme={theme}>
    <FormEditProfileComponent isRegister={false} {...FormEditProfileProps} />
  </ThemeProvider>
);

// TODO check test broken
describe.skip('FormEditProfile', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('Testing param isRegister is false', () => {
    it('renders without error and match snapshot isRegister false', () => {
      render(TestingComponentRegisterFalse);
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });

  describe('Testing param isRegister true', () => {
    it('renders without error and match snapshot isRegister true', () => {
      render(TestingComponentRegisterTrue);
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
