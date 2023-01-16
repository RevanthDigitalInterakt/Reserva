import { ThemeProvider } from 'styled-components/native';
import { theme } from '@usereservaapp/reserva-ui';
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import UserProfilePictureComponent from '../UserProfilePictureComponent';

const mockProps = {
  file: {
    uri: undefined,
    type: '',
    name: '',
    initialFilePath: undefined,
  },
  toogleModalChangeFile: jest.fn(),
  userEmail: 'user@gmail.com.br',
};

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <UserProfilePictureComponent {...mockProps} />
  </ThemeProvider>
);

describe('Submiting Content', () => {
  beforeEach(async () => {
    render(TestingComponent);
  });

  it('renders without error and match snapshot', () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('check button password is visible', () => {
    expect(screen.getByTestId('userprofilepicture_button_edit_password')).toBeVisible();
  });

  // @TODO adicianar teste para verificar se o avatar esta visivel ou nao
});
