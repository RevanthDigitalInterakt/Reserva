import { act, renderHook } from '@testing-library/react-hooks';
import { useDorisVerify } from '../useDorisVerify';

jest.mock('../../base/graphql/generated', () => ({
  useVerifyDorisProductLazyQuery: () => [
    jest.fn(() => ({
      data: {
        verifyDorisProduct: {
          valid: true,
        },
      },
    })),
  ],
}));

jest.mock('@react-native-firebase/remote-config', () => ({
  __esModule: true,
  default: () => ({
    setDefaults: jest.fn(),
  }),
}));

jest.mock('../useRemoteConfig.ts', () => ({
  useRemoteConfig: () => ({
    getBoolean: () => ({
      show_doris_button: true,
    }),
  }),
}));

describe('useDorisVerify', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  it('should return isValidProductDoris true when product exist in Doris', async () => {
    const { result } = renderHook(() => useDorisVerify());
    const eanValid = '0079374014';

    await act(() => {
      result.current.verifyProductDoris(eanValid);
    });

    expect(result.current.isValidProductDoris).toBeTruthy();
  });
});
