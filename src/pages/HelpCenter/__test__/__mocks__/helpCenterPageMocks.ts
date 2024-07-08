import type { DocumentNode } from 'graphql';
import { HelpCenterCollectionDocument, type HelpCenterCollectionQuery } from '../../../../base/graphql/generated';
import { mockHelpCenterCollectionData } from '../../../../zustand/useHelpCenterStore/mocks/helpCenterCollection.mock';

interface IApolloMock<T> {
  request: {
    query: DocumentNode,
    variables: object,
  },
  result: {
    data: T
  }
}

export const helpCenterPageMocks: Array<IApolloMock<HelpCenterCollectionQuery>> = [
  {
    request: {
      query: HelpCenterCollectionDocument,
      variables: {},
    },
    result: {
      data: {
        helpCenterCollection: {
          ...mockHelpCenterCollectionData,
        },
        __typename: 'Query',
      },
    },
  },
];
