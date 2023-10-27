import { ThemeProvider } from 'styled-components/native';
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import UserProfilePictureComponent from '../UserProfilePictureComponent';
import { theme } from '../../../../../base/usereservappLegacy/theme';

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
    expect(screen.getByTestId('com.usereserva:id/userprofilepicture_button_edit_password')).toBeVisible();
  });

  // TODO adicianar teste para verificar se o avatar esta visivel ou nao
});
