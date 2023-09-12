import { renderHook, act } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import { has24HoursPassed, useOncePerDayEvent } from '../useOncePerDayEvent';
import EventProvider from '../EventProvider';

jest.setTimeout(10000);
jest.mock('@react-native-community/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('has24HoursPassed', () => {
  it('should return true if lastEventDate is not set', async () => {
    AsyncStorage.getItem = jest.fn().mockResolvedValue(null);

    const result = await has24HoursPassed('someKey');

    expect(result).toBe(true);
  });

  it('should return true if more than 24 hours have passed', async () => {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 25);
    AsyncStorage.getItem = jest
      .fn()
      .mockResolvedValue(twentyFourHoursAgo.toISOString());

    const result = await has24HoursPassed('someKey');

    expect(result).toBe(true);
  });

  it('should return false if less than 24 hours have passed', async () => {
    const lessThanTwentyFourHoursAgo = new Date();
    lessThanTwentyFourHoursAgo.setHours(lessThanTwentyFourHoursAgo.getHours() - 23);
    AsyncStorage.getItem = jest
      .fn()
      .mockResolvedValue(lessThanTwentyFourHoursAgo.toISOString());

    const result = await has24HoursPassed('someKey');

    expect(result).toBe(false);
  });
});

describe('useOncePerDayEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize canTriggerEvent to false', () => {
    const { result } = renderHook(() => useOncePerDayEvent('testKey'));

    expect(result.current.canTriggerEvent).toBe(false);
  });

  it('should return canTriggerEvent as true when last event is not set', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const { result, waitForNextUpdate } = renderHook(() => useOncePerDayEvent('testEventKey'));

    await waitForNextUpdate();

    expect(result.current.canTriggerEvent).toBe(true);
  });

  it('should return canTriggerEvent as true when more than 24 hours have passed', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('2023-08-28T19:10:58.229Z');

    const { result, waitForNextUpdate } = renderHook(() => useOncePerDayEvent('testEventKey'));
    await has24HoursPassed('testEventKey');

    act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.canTriggerEvent).toBe(true);
  });

  it('should return canTriggerEvent as false when less than 24 hours have passed', async () => {
    const now = new Date();
    const lessThan24HoursAgo = new Date(now.getTime() - 1000 * 60 * 60 * 20).toISOString();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(lessThan24HoursAgo);

    const { result, waitForNextUpdate } = renderHook(() => useOncePerDayEvent('testEventKey'));

    act(async () => {
      await waitForNextUpdate();
    });
    expect(result.current.canTriggerEvent).toBe(false);
  });

  it('should call trackEventDitoStatusCart and setItem when triggerEvent is called', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('2023-08-28T19:10:58.229Z');
    const trackEventSpy = jest.spyOn(EventProvider, 'sendTrackEvent');
    const spyAsyncStorage = jest.spyOn(AsyncStorage, 'setItem');

    const { result } = renderHook(() => useOncePerDayEvent('testEventKey'));

    result.current.setCanTriggerEvent(true);
    await act(async () => {
      await result.current.triggerEvent();
    });

    expect(trackEventSpy).toHaveBeenCalled();
    expect(spyAsyncStorage).toHaveBeenCalledWith(
      'testEventKey',
      expect.any(String),
    );
  });
});
