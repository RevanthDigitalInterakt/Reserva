import Config from 'react-native-config';
import {
  ApolloClient, ApolloLink, HttpLink, InMemoryCache, from,
} from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { authAfterware, authLinkHeader, directionalLinkProduction } from '../clients/links';
import { errorLinks, transactionIdLink } from '../clients/gateway/links';

const refreshTokenGatewayLink = errorLinks.concat(
  transactionIdLink.concat(
    new HttpLink({ uri: Config.URL_GATEWAY_CLIENT }),
  ),
);

export const refreshTokenProductionLink = from([
  authLinkHeader,
  authAfterware,
  ApolloLink.split(
    (operation) => operation.getContext().clientName === 'gateway',
    new RetryLink().concat(refreshTokenGatewayLink),
    directionalLinkProduction,
  ),
]);

export const refreshTokenApolloClient = new ApolloClient({
  link: refreshTokenProductionLink,
  cache: new InMemoryCache(),
});
