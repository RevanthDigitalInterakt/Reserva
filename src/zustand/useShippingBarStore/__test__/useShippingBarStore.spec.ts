import { renderHook, act } from '@testing-library/react-hooks';
import { useShippingBarStore } from '../useShippingBarStore';

describe('useShippingBarStore', () => {
  it('should initialize state with default values', () => {
    const { result } = renderHook(() => useShippingBarStore());

    expect(result.current.sumPrice).toBe(0);
    expect(result.current.loadingBar).toBe(false);
    expect(result.current.isFreeShipping).toBe(false);
    expect(result.current.valueProgressBar).toBe(0);
    expect(result.current.freeShippingValue).toBe(0);
  });

  it('should update sumPrice when setSumPrice is called', () => {
    const { result } = renderHook(() => useShippingBarStore());

    act(() => {
      result.current.setSumPrice(100);
    });

    expect(result.current.sumPrice).toBe(100);
  });

  it('should update loadingBar when setLoadingBar is called', () => {
    const { result } = renderHook(() => useShippingBarStore());

    act(() => {
      result.current.setLoadingBar(true);
    });

    expect(result.current.loadingBar).toBe(true);
  });

  it('should update isFreeShipping when setIsFreeShipping is called', () => {
    const { result } = renderHook(() => useShippingBarStore());

    act(() => {
      result.current.setIsFreeShipping(true);
    });

    expect(result.current.isFreeShipping).toBe(true);
  });

  it('should update valueProgressBar when setValueProgressBar is called', () => {
    const { result } = renderHook(() => useShippingBarStore());

    act(() => {
      result.current.setValueProgressBar(50);
    });

    expect(result.current.valueProgressBar).toBe(50);
  });

  it('should update freeShippingValue when setFreeShippingValue is called', () => {
    const { result } = renderHook(() => useShippingBarStore());

    act(() => {
      result.current.setFreeShippingValue(100);
    });

    expect(result.current.freeShippingValue).toBe(100);
  });
});
