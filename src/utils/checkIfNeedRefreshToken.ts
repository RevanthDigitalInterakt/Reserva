import { getAsyncStorageItem } from '../hooks/useAsyncStorageProvider';

export async function checkIfNeedRefreshToken() {
  const nextRefreshTime = await getAsyncStorageItem('Auth:TokenRefreshTime') || 0;

  if (!nextRefreshTime) return false;

  return new Date().getTime() > nextRefreshTime;
}
