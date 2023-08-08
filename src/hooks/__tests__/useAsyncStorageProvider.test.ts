import { renderHook } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncStorageProvider from '../useAsyncStorageProvider';

describe('useAsyncStorageProvider test', () => {
  it('should successfully setItem', async () => {
    const { result } = renderHook(() => useAsyncStorageProvider());
    const arr = ['1', '2', '3'];

    await result.current.setItem('@RNOrder:RonItems', arr);

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@RNOrder:RonItems', JSON.stringify(arr));
  });

  it('should successfully try to getItem', async () => {
    const { result } = renderHook(() => useAsyncStorageProvider());

    await result.current.getItem('@RNOrder:RonItems');

    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('@RNOrder:RonItems');
  });
});
