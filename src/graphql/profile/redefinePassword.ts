import { gql } from '@apollo/client';

export const redefinePasswordMutation = gql`
  mutation RedefinePassword(
    $email: String!
    $currentPassword: String!
    $newPassword: String!
  ) @context(provider: "vtex.store-graphql") {
    redefinePassword(
      email: $email
      currentPassword: $currentPassword
      newPassword: $newPassword
    )
  }
`;
