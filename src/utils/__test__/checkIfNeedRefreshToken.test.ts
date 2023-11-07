import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { checkIfNeedRefreshToken } from '../checkIfNeedRefreshToken';

AsyncStorageMock.getItem = jest.fn((key) => {
  if (key === 'Auth:TokenRefreshTime') {
    return Promise.resolve(1);
  }

  return Promise.resolve(undefined);
});

describe('checkIfNeedRefreshToken', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return false if next refresh time is not set', async () => {
    const result = await checkIfNeedRefreshToken();

    expect(AsyncStorageMock.getItem).toHaveBeenCalledWith('Auth:TokenRefreshTime');
    expect(result).toBe(true);
  });
});
