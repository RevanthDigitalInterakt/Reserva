import { Config } from 'react-native-config';
import { setContext } from '@apollo/client/link/context';
import { v4 } from 'uuid';
import { onError } from '@apollo/client/link/error';
import { getAsyncStorageItem } from '../../hooks/useAsyncStorageProvider';
import { navigateUsingRef } from '../../utils/navigationRef';
import { trackApolloError } from '../utils/trackApolloError';
import { INVALID_AUTHORIZATION_ERROR } from '../utils/constants';

export const transactionIdLink = setContext(async (_, { headers }) => {
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

export const errorLinks = onError(({
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
