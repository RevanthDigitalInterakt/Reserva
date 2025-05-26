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

    const payload = await result.current.onTrack({
      typeEvent: TrackEventTypeEnum.Click,
      nameEvent: TrackEventNameEnum.ClickedItems,
      sku: ['4997'],
    });

    expect(payload).toBe(undefined);
  });

  it('should test method onTrack Clicked object IDs after search', async () => {
    const { result } = renderHook(() => trackClickAlgoliaStore.getState());

    const payload = await result.current.onTrack({
      typeEvent: TrackEventTypeEnum.Click,
      nameEvent: TrackEventNameEnum.ClickedItemsSearch,
      sku: ['4997'],
      subTypeEvent: TrackEventSubTypeEnum.AddToCart,
      positions: [1],
      queryID: '5656541655136',
    });

    expect(payload).toBe(undefined);
  });

  it('should test method onTrack Viewed object IDs', async () => {
    const { result } = renderHook(() => trackClickAlgoliaStore.getState());

    const payload = await result.current.onTrack({
      typeEvent: TrackEventTypeEnum.View,
      nameEvent: TrackEventNameEnum.ViewedItems,
      sku: ['4997'],
    });

    expect(payload).toBe(undefined);
  });

  it('should test method onTrack Added object IDs to cart', async () => {
    const { result } = renderHook(() => trackClickAlgoliaStore.getState());

    const payload = await result.current.onTrack({
      typeEvent: TrackEventTypeEnum.Conversion,
      nameEvent: TrackEventNameEnum.CartItems,
      sku: ['4997'],
      subTypeEvent: TrackEventSubTypeEnum.AddToCart,
      dataObject: [{
        discount: 15,
        price: 70000,
        quantity: 1,
      }],
      totalPrice: 70000,
    });

    expect(payload).toBe(undefined);
  });
});
