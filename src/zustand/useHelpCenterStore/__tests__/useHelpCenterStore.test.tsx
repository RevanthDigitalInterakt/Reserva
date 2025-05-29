import { act, renderHook } from '@testing-library/react-hooks';
import { useHelpCenterStore } from '../useHelpCenterStore';
import {
  footerFormatMock,
  itemsFormatMock,
  mockHelpCenterCollectionData,
} from '../mocks/helpCenterCollection.mock';

describe('useHelpCenterStore', () => {
  it('should loading be false after starting and initialized be true', () => {
    const { result } = renderHook(() => useHelpCenterStore(['loading', 'actions', 'initialized']));

    act(() => {
      result.current.actions.INITIAL_LOADING();
    });

    expect(result.current.loading).toBeFalsy();
    expect(result.current.initialized).toBeTruthy();
  });

  it('should return values in the correct format', async () => {
    const { result } = renderHook(() => useHelpCenterStore([
      'actions',
      'itemsHelpCenter',
      'footerHelpCenter',
      'titleHelpCenter',
      'loading',
    ]));

    act(() => {
      result.current.actions.SET_DATA(mockHelpCenterCollectionData);
    });

    const title = result.current?.titleHelpCenter;
    const footer = result.current?.footerHelpCenter;
    const items = result.current.itemsHelpCenter;

    expect(title).toBe('Central de ajuda');
    expect(footer).toEqual(footerFormatMock);
    expect(items).toEqual(itemsFormatMock);
    expect(result.current.loading).toBeFalsy();
  });
});
