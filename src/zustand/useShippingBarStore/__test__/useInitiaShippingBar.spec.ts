import { renderHook, act } from '@testing-library/react-hooks';
import { useInitialShippingBar } from '../useInitialShippingBarStore';
import { useConfigShippingBarLazyQuery } from '../../../base/graphql/generated';
import { useShippingBarStore } from '../useShippingBarStore';

jest.mock('../../../base/graphql/generated', () => ({
  useConfigShippingBarLazyQuery: jest.fn(),
}));

const mockConfigShippingBarQueryResponse = {
  data: {
    config: {
      shippingBar: {
        freeShippingValue: 50,
        isFreeShipping: false,
      },
    },
  },
};

describe('useInitiaShippingBar', () => {
  it('should update the useShippingBarStore state correctly', async () => {
    const sumPriceShipping = 100;
    const loading = false;

    (useConfigShippingBarLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      { data: mockConfigShippingBarQueryResponse },
    ]);

    renderHook(() => useInitialShippingBar(sumPriceShipping, loading));
    const { result } = renderHook(() => useShippingBarStore());

    act(() => {
      result.current.setSumPrice(100);
    });

    const store = useShippingBarStore.getState();
    expect(store.sumPrice).toBe(100);
    expect(store.loadingBar).toBe(true);
    expect(store.isFreeShipping).toBe(false);
    expect(store.freeShippingValue).toBe(0);
    expect(store.valueProgressBar).toBe(100);
  });
});
