import { renderHook } from '@testing-library/react-hooks';
import { trackClickStore, type IData } from '../useTrackClickStore';
import { TrackPageTypeEnum } from '../../../base/graphql/generated';

jest.mock('../../../utils/getApolloClient', () => ({
  getApolloClient: () => ({
    mutate: jest.fn(),
  }),
}));

describe('trackPageViewStore', () => {
  it('should render initial state', () => {
    const { result } = renderHook(() => trackClickStore.getState());

    expect(result.current.sessionId.length).toBe(36);
  });

  it('should test onSendTrackClick', async () => {
    const data: IData = {
      identifier: '',
      productId: '1670215',
    };

    const { result } = renderHook(() => trackClickStore.getState());
    const payload = await result.current.onSendTrackClick(data, TrackPageTypeEnum.Home);

    expect(payload).toBe(undefined);
  });
});
