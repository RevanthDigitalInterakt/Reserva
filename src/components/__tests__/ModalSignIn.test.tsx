import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react-native';
import { act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components/native';

import { mockPrimeData } from '../../../__mocks__/PrimeLP.mock';
import * as useLandingPagePrimeQuery from '../../base/graphql/generated';
import { ApolloMockLPPrime } from '../../pages/PrimeLP/__mocks__/primeLPMocks';

import { ModalSignIn } from '../ModalSignIn';
import { isValidEmail, isValidPassword } from '../ModalSignIn/utils';
import { theme } from '../../base/usereservappLegacy/theme';

const mockAddItemFn = jest.fn();
const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

jest.mock('../../hooks/usePrimeInfo', () => ({
  usePrimeInfo: () => ({
    onAddPrimeToCart: mockAddItemFn,
  }),
}));

jest.mock('../../zustand/useApolloFetchPolicyStore', () => ({
  useApolloFetchPolicyStore: () => ({
    getFetchPolicyPerKey: () => 'network-only',
  }),
}));

jest
  .spyOn(useLandingPagePrimeQuery, 'useLandingPagePrimeQuery')
  .mockReturnValue({
    data: {
      landingPagePrime: {
        ...mockPrimeData,
      },
    },
    loading: false,
  } as any);

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={ApolloMockLPPrime} addTypename={false}>
      <ModalSignIn
        onClose={jest.fn()}
        isVisible
      />
    </MockedProvider>
  </ThemeProvider>
);

describe('ModalSignIn', () => {
  it('should match with the snapshot', async () => {
    const { toJSON } = render(Component);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render element correctly', async () => {
    const { getByTestId } = render(Component);

    const elementWrapper = getByTestId('com.usereserva:id/modal_sign_in');

    expect(elementWrapper).toBeTruthy();
  });

  describe('should be able correctly call in buttons modal', () => {
    it('Add Prime to cart', async () => {
      const { getByTestId } = render(Component);

      const addPrimeToCart = getByTestId('com.usereserva:id/modal_sign_in_cta_add_prime');

      await act(async () => {
        await fireEvent.press(addPrimeToCart);
      });

      expect(mockAddItemFn).toHaveBeenCalled();
    });

    it('Forgot password', async () => {
      const { getByTestId } = render(Component);

      const goToForgotPassword = getByTestId('com.usereserva:id/modal_sign_in_cta_forgot_password');

      await act(async () => {
        await fireEvent.press(goToForgotPassword);
      });

      expect(mockedNavigate).toHaveBeenCalledWith('ForgotEmail', {});
    });

    it('Redirect to Landing Page Prime', async () => {
      const { getByTestId } = render(Component);

      const clickHereRedirectToLPPrime = getByTestId('com.usereserva:id/modal_sign_click_here');

      await act(async () => {
        await fireEvent.press(clickHereRedirectToLPPrime);
      });

      expect(mockedNavigate).toHaveBeenCalledWith('PrimeLP');
    });
  });

  describe('should be able correctly change texts in fields', () => {
    it('Input E-mail', async () => {
      const { getByTestId } = render(Component);

      const inputEmail = getByTestId('com.usereserva:id/modal_sign_in_input_email');

      await act(async () => {
        await fireEvent.changeText(inputEmail, 'example@example.com');
      });

      expect(inputEmail.props.value).toBe('example@example.com');
    });

    it('Input Password', async () => {
      const { getByTestId } = render(Component);

      const inputPassword = getByTestId('com.usereserva:id/modal_sign_in_input_password');

      await act(async () => {
        await fireEvent.changeText(inputPassword, 'Example@123');
      });

      expect(inputPassword.props.value).toBe('Example@123');
    });
  });

  describe('Utils', () => {
    describe('isValidPassword', () => {
      it('returns true for a valid password', () => {
        const validPassword = 'Abcdefg1';
        const isValid = isValidPassword(validPassword);
        expect(isValid).toBe(true);
      });

      it('returns false for an invalid password', () => {
        const invalidPassword = 'password';
        const isValid = isValidPassword(invalidPassword);
        expect(isValid).toBe(false);
      });
    });

    describe('isValidEmail', () => {
      it('returns true for a valid email', () => {
        const validEmail = 'test@example.com';
        const isValid = isValidEmail(validEmail);
        expect(isValid).toBe(true);
      });

      it('returns false for an invalid email', () => {
        const invalidEmail = 'invalidemail';
        const isValid = isValidEmail(invalidEmail);
        expect(isValid).toBe(false);
      });
    });
  });
});
