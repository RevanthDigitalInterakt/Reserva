import { HttpLink } from '@apollo/client';
import { Config } from 'react-native-config';
import { setContext } from '@apollo/client/link/context';
import { v4 } from 'uuid';

const transactionIdLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'x-transaction-id': v4(),
  },
}));
const gatewayLink = transactionIdLink.concat(
  new HttpLink({
    uri: Config.URL_GATEWAY_CLIENT,
  }),
);

export { gatewayLink };
