import { act, renderHook } from '@testing-library/react-hooks';

import { usePrimeStore } from '../usePrimeStore';

describe('usePrimeStore', () => {
  it('should render initial state', () => {
    const { result } = renderHook(() => usePrimeStore([
      'animationBag',
      'loadingAddCartPrime',
      'isVisibleModalWelcome',
      'hasPrimeSubscriptionInCart',
    ]));

    expect(result.current.animationBag).toEqual(false);
    expect(result.current.animationBag).toEqual(false);
    expect(result.current.loadingAddCartPrime).toEqual(false);
    expect(result.current.hasPrimeSubscriptionInCart).toEqual(false);
  });

  it('should update state of isVisibleModalWelcome when call handleClickContinue', () => {
    const { result } = renderHook(() => usePrimeStore([
      'handleClickContinue',
      'isVisibleModalWelcome',
    ]));

    act(() => {
      result.current.isVisibleModalWelcome = true;
    });

    act(() => {
      result.current.handleClickContinue();
    });

    expect(result.current.isVisibleModalWelcome).toEqual(false);
  });

  it('should update state of animationBag when call changeStateAnimationBag', () => {
    const { result } = renderHook(() => usePrimeStore([
      'animationBag',
      'changeStateAnimationBag',
    ]));

    act(() => {
      result.current.changeStateAnimationBag(true);
    });

    expect(result.current.animationBag).toEqual(true);

    act(() => {
      result.current.changeStateAnimationBag(false);
    });

    expect(result.current.animationBag).toEqual(false);
  });

  it('should update state of hasPrimeSubscriptionInCart when call getHasSubscriptionPrimeInCart', () => {
    const { result } = renderHook(() => usePrimeStore([
      'hasPrimeSubscriptionInCart',
      'getHasSubscriptionPrimeInCart',
    ]));

    act(() => {
      result.current.getHasSubscriptionPrimeInCart(true);
    });

    expect(result.current.hasPrimeSubscriptionInCart).toEqual(true);
  });
});
