import {
  ApolloClient,
  ApolloLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import {
  authAfterware, authLinkHeader, directionalLinkProduction, directionalLinkTesting,
} from '../clients/links';
import { gatewayLink } from '../clients/gateway/gatewayLink';

const linkTesting = from([
  authLinkHeader,
  authAfterware,
  ApolloLink.split(
    (operation) => operation.getContext().clientName === 'gateway',
    new RetryLink().concat(gatewayLink),
    directionalLinkTesting,
  ),
]);

const linkProduction = from([
  authLinkHeader,
  authAfterware,
  ApolloLink.split(
    (operation) => operation.getContext().clientName === 'gateway',
    new RetryLink().concat(gatewayLink),
    directionalLinkProduction,
  ),
]);

export const apolloClientTesting = new ApolloClient({
  link: linkTesting,
  cache: new InMemoryCache(),
});

export const apolloClientProduction = new ApolloClient({
  link: linkProduction,
  cache: new InMemoryCache({
    resultCaching: true,
  }),
});
