import type { ErrorResponse } from '@apollo/client/link/error';
import { navigateUsingRef } from '../../../utils/navigationRef';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { trackApolloError } from '../../utils/trackApolloError';
import { INVALID_AUTHORIZATION_ERROR } from '../../utils/constants';
import { onRefreshToken } from '../../../zustand/useAuth/onRefreshToken';

export async function refreshTokenMiddleware({
  graphQLErrors,
  operation,
  response,
}: ErrorResponse) {
  try {
    if (graphQLErrors?.length) {
      const hasAuthenticationError = graphQLErrors.some((item) => (
        (item.message || '').toLowerCase() === INVALID_AUTHORIZATION_ERROR
      ));

      if (!hasAuthenticationError) return true;

      if (hasAuthenticationError && operation.operationName === 'refreshToken') {
        trackApolloError(operation, graphQLErrors, response);

        if (hasAuthenticationError) {
          navigateUsingRef('Login', { invalidSession: true });
        }

        return false;
      }

      const result = await onRefreshToken(true);

      if (!result) return false;

      return true;
    }
  } catch (e) {
    ExceptionProvider.captureException(e, "refreshTokenMiddleware.ts");
  }

  return true;
}
