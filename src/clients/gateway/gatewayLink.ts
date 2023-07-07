import { HttpLink, Operation } from '@apollo/client';
import { Config } from 'react-native-config';
import { setContext } from '@apollo/client/link/context';
import { v4 } from 'uuid';
import * as Sentry from '@sentry/react-native';
import { onError } from '@apollo/client/link/error';
import { print } from 'graphql';
import type { GraphQLErrors } from '@apollo/client/errors';
import { getAsyncStorageItem } from '../../hooks/useAsyncStorageProvider';
import { navigateUsingRef } from '../../utils/navigationRef';

const INVALID_AUTHORIZATION_ERROR = 'invalid authorization';

function extractOperationTransactionId(operation: Operation) {
  try {
    const ctx = operation.getContext();
    const headers = ctx.headers as Record<string, string>;

    return headers['x-transaction-id'];
  } catch (err) {
    return '';
  }
}

function trackApolloError(operation: Operation, errors: GraphQLErrors, response?: unknown) {
  try {
    const errorMessage = `Gateway Operation Error [${operation.operationName}]`;
    const transactionId = extractOperationTransactionId(operation);

    Sentry.withScope((scope) => {
      if (transactionId) scope.setTag('transaction_id', transactionId);
      scope.setExtra('operationName', operation.operationName);
      scope.setExtra('variables', operation.variables);
      scope.setExtra('query', print(operation.query));
      scope.setExtra('response', response);
      scope.setExtra('errors', errors);
      Sentry.captureException(new Error(errorMessage));
    });
  } catch (err) {
    //
  }
}

const transactionIdLink = setContext(async (_, { headers }) => {
  const Authorization = await getAsyncStorageItem('Auth:Token') || '';

  return ({
    headers: {
      ...headers,
      'x-transaction-id': v4(),
      'x-api-key': Config.API_KEY_GATEWAY,
      Authorization,
    },
  });
});

const errorLinks = onError(({
  graphQLErrors,
  forward,
  operation,
  response,
}) => {
  if (graphQLErrors?.length) {
    const hasAuthenticationError = graphQLErrors.some((item) => (
      (item.message || '').toLowerCase() === INVALID_AUTHORIZATION_ERROR
    ));

    trackApolloError(operation, graphQLErrors, response);

    if (hasAuthenticationError) {
      navigateUsingRef('Login', { invalidSession: true });
      return;
    }
  }

  forward(operation);
});

const gatewayLink = errorLinks.concat(
  transactionIdLink.concat(
    new HttpLink({ uri: Config.URL_GATEWAY_CLIENT }),
  ),
);

export { gatewayLink };
