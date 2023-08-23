import type { ErrorResponse } from '@apollo/client/link/error';
import { onRefreshToken } from '../../../zustand/useAuth/useAuthStore';
import { trackApolloError } from '../gatewayLink';
import { navigateUsingRef } from '../../../utils/navigationRef';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';

export const INVALID_AUTHORIZATION_ERROR = 'invalid authorization';

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

      const result = await onRefreshToken();

      if (!result) return false;

      return true;
    }
  } catch (e) {
    ExceptionProvider.captureException(e);
  }

  return true;
}
