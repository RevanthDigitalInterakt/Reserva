import { ThemeProvider } from 'styled-components/native';
import React from 'react';
import {
  act, fireEvent, render, screen,
} from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import NewsLetterComponent from '../NewsLetterComponent';
import subscribeNewsLetter from '../../../../../graphql/profile/newsLetter';
import { theme } from '../../../../../base/usereservappLegacy/theme';

const NewsLetterParams = {
  value: false,
  userEmail: 'user@gmail.com',
  handleToogleNewsLetterState: jest.fn(),
};

const apolloMocks = [
  {
    request: {
      query: subscribeNewsLetter,
      variables: {
        email: 'user@gmail.com',
        isNewsletterOptIn: true,
      },
    },
    result: {
      data: {
        subscribeNewsletter: true,
      },
    },
  },
];

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={apolloMocks} addTypename={false}>
      <NewsLetterComponent {...NewsLetterParams} />
    </MockedProvider>
  </ThemeProvider>
);

describe('NewsLetter Component', () => {
  it('renders without error and match snapshot', () => {
    render(TestingComponent);
    expect(screen.getByTestId('com.usereserva:id/newsletter_button')).toBeVisible();
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('Checks if the button is being clicked', async () => {
    render(TestingComponent);
    await act(async () => {
      await fireEvent.press(screen.getByTestId('com.usereserva:id/newsletter_button'));
    });

    await act(async () => {
    });

    // @TOTO - Implementar toHaveBeenCalledWith para verificar os parametros.
    expect(NewsLetterParams.handleToogleNewsLetterState).toHaveBeenCalledTimes(1);
  });
});
