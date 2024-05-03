import { renderHook } from '@testing-library/react-hooks';
import { trackClickAlgoliaStore } from '../useTrackAlgoliaStore';
import { TrackEventNameEnum, TrackEventSubTypeEnum, TrackEventTypeEnum } from '../../../base/graphql/generated';

jest.mock('../../../utils/getApolloClient', () => ({
  getApolloClient: () => ({
    mutate: jest.fn(),
  }),
}));

describe('track algolia', () => {
  it('should render initial state', () => {
    const { result } = renderHook(() => trackClickAlgoliaStore.getState());

    expect(result.current.sessionId.length).toBe(36);
  });

  it('should test method onTrack Clicked object IDs:', async () => {
    const { result } = renderHook(() => trackClickAlgoliaStore.getState());

    const payload = await result.current.onTrack(
      TrackEventTypeEnum.Click,
      TrackEventNameEnum.ClickedItems,
      ['4997'],
    );

    expect(payload).toBe(undefined);
  });

  it('should test method onTrack Clicked object IDs after search', async () => {
    const { result } = renderHook(() => trackClickAlgoliaStore.getState());

    const payload = await result.current.onTrack(
      TrackEventTypeEnum.Click,
      TrackEventNameEnum.ClickedItems,
      ['4997'],
      undefined,
      undefined,
      undefined,
      '5656541655136',
      [1],
    );

    expect(payload).toBe(undefined);
  });

  it('should test method onTrack Viewed object IDs', async () => {
    const { result } = renderHook(() => trackClickAlgoliaStore.getState());

    const payload = await result.current.onTrack(
      TrackEventTypeEnum.View,
      TrackEventNameEnum.ViewedItems,
      ['4997'],
    );

    expect(payload).toBe(undefined);
  });

  it('should test method onTrack Added object IDs to cart', async () => {
    const { result } = renderHook(() => trackClickAlgoliaStore.getState());

    const payload = await result.current.onTrack(
      TrackEventTypeEnum.Conversion,
      TrackEventNameEnum.CartItems,
      ['4997'],
      TrackEventSubTypeEnum.AddToCart,
      [{
        discount: 15,
        price: 70000,
        quantity: 1,
      }],
      70000,
    );

    expect(payload).toBe(undefined);
  });
});
