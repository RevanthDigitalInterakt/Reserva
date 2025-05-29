import { RefreshTokenDocument, type RefreshTokenMutation, type RefreshTokenMutationVariables } from '../../base/graphql/generated';
import { setAsyncStorageItem } from '../../hooks/useAsyncStorageProvider';
import { checkIfNeedRefreshToken } from '../../utils/checkIfNeedRefreshToken';
import { createTokenExpireDate } from '../../utils/createTokenExpireDate';
import { refreshTokenApolloClient } from '../../services/refreshTokenApolloClient';

export async function onRefreshToken(forceRefresh = false) {
  const needRefreshToken = await checkIfNeedRefreshToken();

  if (!needRefreshToken && !forceRefresh) return false;

  const client = refreshTokenApolloClient;

  const { data } = await client.mutate<RefreshTokenMutation, RefreshTokenMutationVariables>({
    context: { clientName: 'gateway' },
    mutation: RefreshTokenDocument,
    fetchPolicy: 'no-cache',
  });

  if (!data?.refreshToken?.token || !data?.refreshToken?.authCookie) {
    throw new Error('Unauthorized');
  }

  await setAsyncStorageItem('Auth:Token', data.refreshToken.token);
  await setAsyncStorageItem('Auth:Cookie', data.refreshToken.authCookie);
  await setAsyncStorageItem('Auth:TokenRefreshTime', createTokenExpireDate());

  return true;
}
