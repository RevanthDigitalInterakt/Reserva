import type { DocumentNode } from 'graphql';
import { LandingPagePrimeDocument, LandingPagePrimeQuery } from '../../../base/graphql/generated';
import { mockPrimeData } from '../../../../__mocks__/PrimeLP.mock';

interface IApolloMock<T> {
  request: {
    query: DocumentNode,
    variables: object,
  },
  result: {
    data: T
  }
}

export const ApolloMockLPPrime: Array<IApolloMock<LandingPagePrimeQuery>> = [
  {
    request: {
      query: LandingPagePrimeDocument,
      variables: {},
    },
    result: {
      data: {
        landingPagePrime: {
          ...mockPrimeData,
        },
        __typename: 'Query',
      },
    },
  },
];
