import { gql } from '@apollo/client';

export interface IDeepLinkRoute {
  path: string;
  referenceId: string
}
export interface IDeepLinkQuery {
  deepLinkRoutesCollection: {
    items: Array<IDeepLinkRoute>
  }
}
export const deepLinkQuery = gql`
    query DeepLinkRoutes($pathRoute: String!) {
        deepLinkRoutesCollection(where: { path: $pathRoute, active: true }) {
            items {
              path
              referenceId
            }
        }
    }
`;
