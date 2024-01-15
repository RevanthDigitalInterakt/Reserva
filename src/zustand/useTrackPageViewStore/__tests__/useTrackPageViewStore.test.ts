import { renderHook } from '@testing-library/react-hooks';
import { trackPageViewStore } from '../useTrackPageViewStore';
import { TrackPageTypeEnum } from '../../../base/graphql/generated';

jest.mock('../../../utils/getApolloClient', () => ({
  getApolloClient: () => ({
    mutate: jest.fn(),
  }),
}));

describe('trackPageViewStore', () => {
  it('should render initial state', () => {
    const { result } = renderHook(() => trackPageViewStore.getState());

    expect(result.current.sessionId.length).toBe(36);
  });

  it('should test onUpdateNavigation', () => {
    const { result } = renderHook(() => trackPageViewStore.getState());
    const navigation = result.current.onUpdateNavigation('test', TrackPageTypeEnum.Product);

    expect(navigation.length).toBe(1);
  });
});
