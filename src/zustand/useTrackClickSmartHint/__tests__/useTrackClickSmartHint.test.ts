import { renderHook } from '@testing-library/react-hooks';
import { trackClickSmartHintStore } from '../useTrackClickSmartHint';
import { TrackPageTypeEnum } from '../../../base/graphql/generated';

jest.mock('../../../utils/getApolloClient', () => ({
  getApolloClient: () => ({
    mutate: jest.fn(),
  }),
}));

describe('trackPageViewStore', () => {
  it('should render initial state', () => {
    const { result } = renderHook(() => trackClickSmartHintStore.getState());

    expect(result.current.sessionId.length).toBe(36);
  });

  it('should test onSendTrackClick', async () => {
    const { result } = renderHook(() => trackClickSmartHintStore.getState());
    const payload = await result.current.onSendTrackClick('1670215', TrackPageTypeEnum.Home);

    expect(payload).toBe(undefined);
  });
});
