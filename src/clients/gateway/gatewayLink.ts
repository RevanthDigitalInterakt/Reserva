import { HttpLink, Observable, Operation } from '@apollo/client';
import { Config } from 'react-native-config';
import { setContext } from '@apollo/client/link/context';
import { v4 } from 'uuid';
import { onError } from '@apollo/client/link/error';
import { print } from 'graphql';
import type { GraphQLErrors } from '@apollo/client/errors';
import { getAsyncStorageItem } from '../../hooks/useAsyncStorageProvider';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { refreshTokenMiddleware } from './middlewares/refreshTokenMidddleware';

function extractOperationTransactionId(operation: Operation) {
  try {
    const ctx = operation.getContext();
    const headers = ctx.headers as Record<string, string>;

    return headers['x-transaction-id'];
  } catch (err) {
    return '';
  }
}

export function trackApolloError(operation: Operation, errors: GraphQLErrors, response?: unknown) {
  try {
    const errorMessage = `Gateway Operation Error [${operation.operationName}]`;
    const transactionId = extractOperationTransactionId(operation);

    ExceptionProvider.captureException(
      new Error(errorMessage),
      {
        operationName: operation.operationName,
        variables: operation.variables,
        query: print(operation.query),
        response,
        errors,
      },
      {
        transaction_id: transactionId,
      },
    );
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
    return new Observable((observer) => {
      refreshTokenMiddleware({
        graphQLErrors,
        forward,
        operation,
        response,
      }).then((retry) => {
        if (!retry) return;

        const subscriber = {
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        };

        // Retry last failed request
        return forward(operation).subscribe(subscriber);
      });
    });
  }

  return forward(operation);
});

const gatewayLink = errorLinks.concat(
  transactionIdLink.concat(
    new HttpLink({ uri: Config.URL_GATEWAY_CLIENT }),
  ),
);

export { gatewayLink };
