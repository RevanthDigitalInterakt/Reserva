import { act, renderHook } from '@testing-library/react-hooks';
import type { AppStateStatus } from 'react-native';
import { handleCheckAppState, useRefreshToken } from '../useRefreshToken';

const mockOnInit = jest.fn();
const mockOnRefreshToken = jest.fn();

jest.mock('../../zustand/useAuth/useAuthStore', () => ({
  useAuthStore: () => ({ onInit: mockOnInit, onRefreshToken: mockOnRefreshToken }),
}));

describe('useRefreshToken test', () => {
  it('should call onRefreshToken and onInit when mounted', async () => {
    renderHook(() => useRefreshToken());

    await act(async () => {
      expect(await mockOnInit).toHaveBeenCalled();
      expect(await mockOnRefreshToken).toHaveBeenCalled();
    });
  });

  it('should return true when coming from brackground', async () => {
    const appState = { current: 'background' } as React.MutableRefObject<AppStateStatus>;
    const checkedState = handleCheckAppState(appState, 'active');

    expect(checkedState).toBeTruthy();
  });

  it('should return true when coming from inactive', async () => {
    const appState = { current: 'inactive' } as React.MutableRefObject<AppStateStatus>;
    const checkedState = handleCheckAppState(appState, 'active');

    expect(checkedState).toBeTruthy();
  });

  it('should return false when coming from active state', async () => {
    const appState = { current: 'active' } as React.MutableRefObject<AppStateStatus>;
    const checkedState = handleCheckAppState(appState, 'background');

    expect(checkedState).toBeTruthy();
  });
});
