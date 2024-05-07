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

describe('useDorisVerify', () => {
  it('should return isValidProductDoris true when product exist in Doris', async () => {
    const { result } = renderHook(() => useDorisVerify());
    const eanValid = '0079374014';

    await act(() => {
      result.current.verifyProductDoris(eanValid);
    });

    expect(result.current.isValidProductDoris).toBeTruthy();
  });
});
