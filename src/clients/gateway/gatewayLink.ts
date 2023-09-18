import { HttpLink, Observable } from '@apollo/client';
import { Config } from 'react-native-config';
import { onError } from '@apollo/client/link/error';
import { errorLinks, transactionIdLink } from './links';
import { refreshTokenMiddleware } from './middlewares/refreshTokenMiddleware';

export const refreshTokenLink = onError(({
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
        forward(operation).subscribe(subscriber);
      });
    });
  }

  return forward(operation);
});

const gatewayLink = errorLinks.concat(
  refreshTokenLink.concat(
    transactionIdLink.concat(
      new HttpLink({ uri: Config.URL_GATEWAY_CLIENT }),
    ),
  ),
);

export { gatewayLink };
