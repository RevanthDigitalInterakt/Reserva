import { act, renderHook, cleanup } from '@testing-library/react-hooks';
import { usePageLoadingStore } from '../usePageLoadingStore';
import EventProvider from '../../../utils/EventProvider';

describe('usePageLoadingStore', () => {
  afterEach(() => {
    jest.clearAllTimers();
    cleanup();
  });
  it('should start and finish loading a page', () => {
    const { result } = renderHook(() => usePageLoadingStore(['onStartLoad', 'currentRoute', 'startLoadingTime', 'onFinishLoad']));

    act(() => {
      result.current.onStartLoad('ProductDetail');
    });

    expect(result.current.currentRoute).toBe('ProductDetail');
    expect(result.current.startLoadingTime).not.toBe(0);

    act(() => {
      result.current.onFinishLoad();
    });

    expect(result.current.currentRoute).toBeUndefined();
    expect(result.current.startLoadingTime).toBe(0);
  });

  it('should not update state if currentRoute is the same', () => {
    const { result } = renderHook(() => usePageLoadingStore(['onStartLoad', 'startLoadingTime']));

    act(() => {
      result.current.onStartLoad('ProductDetail');
    });

    const initialStartLoadingTime = result.current.startLoadingTime;

    act(() => {
      result.current.onStartLoad('ProductDetail');
    });

    expect(result.current.startLoadingTime).toBe(initialStartLoadingTime);
  });

  it('should not finish loading if currentRoute is undefined', () => {
    const { result } = renderHook(() => usePageLoadingStore(['onFinishLoad', 'currentRoute', 'startLoadingTime']));

    act(() => {
      result.current.onFinishLoad();
    });

    expect(result.current.currentRoute).toBeUndefined();
    expect(result.current.startLoadingTime).toBe(0);
  });

  it('should log elapsed time when finishing loading', () => {
    const logEventSpy = jest.spyOn(EventProvider, 'logEvent');
    const { result } = renderHook(() => usePageLoadingStore(['onStartLoad', 'onFinishLoad']));

    act(() => {
      result.current.onStartLoad('ProductDetail');
    });

    const currTime = new Date().getTime();
    const elapsedTime = 1200;

    jest.spyOn(Date.prototype, 'getTime').mockReturnValueOnce(currTime + elapsedTime);

    act(() => {
      result.current.onFinishLoad();
    });

    expect(logEventSpy).toBeCalledTimes(1);
    const elapsedTimeExpect = (1200 / 100) / 10;
    expect(logEventSpy).toHaveBeenCalledWith('page_load_time', { value: elapsedTimeExpect, page: 'ProductDetail' });
  });

  it('onStartLoad should update currentRoute and startLoadingTime', () => {
    const { result } = renderHook(() => usePageLoadingStore(['onStartLoad', 'onFinishLoad', 'currentRoute', 'startLoadingTime']));

    act(() => {
      result.current.onStartLoad('Home');
    });

    expect(result.current.currentRoute).toBe('Home');
    expect(result.current.startLoadingTime).not.toBe(0);

    act(() => {
      result.current.onFinishLoad();
    });
  });

  it('onFinishLoad should reset state', () => {
    const { result } = renderHook(() => usePageLoadingStore(['onStartLoad', 'startLoadingTime', 'onFinishLoad', 'currentRoute']));

    act(() => {
      result.current.onStartLoad('ProductDetail');
    });

    act(() => {
      result.current.onFinishLoad();
    });

    expect(result.current.currentRoute).toBeUndefined();
    expect(result.current.startLoadingTime).toBe(0);
  });
});
