import { act, renderHook } from '@testing-library/react-hooks';
import { useAuthentication } from '../useAuthentication';

jest.mock('../../zustand/useBagStore/useBagStore', () => ({
  useBagStore: () => ({
    actions: {
      RESET_ORDER_FORM: () => {},
    },
  }),
}));

describe('useAuthentication test', () => {
  it('should successfully initial datas', async () => {
    const { result } = renderHook(() => useAuthentication({}));

    const { loadingSignIn, isLoadingEmail, loginCredentials } = result.current;

    expect(loadingSignIn).toEqual(false);
    expect(isLoadingEmail).toEqual(false);
    expect(loginCredentials).toEqual({
      username: '',
      password: '',
      hasError: false,
      passwordError: '',
      usernameError: '',
      showMessageError: '',
      showPasswordError: false,
      showUsernameError: false,
    });
  });

  it('should set loadingSignIn to true during sign in', async () => {
    const { result, waitFor } = renderHook(() => useAuthentication({}));

    act(() => {
      result.current.setEmailIsValid(true);
      result.current.setPasswordIsValid(true);
    });

    await act(async () => {
      await result.current.handleLogin();

      await waitFor(() => {
        expect(result.current.loadingSignIn).toBe(false);
      });
    });
  });
});
