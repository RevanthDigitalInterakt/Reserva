import { gql } from '@apollo/client';

export type ProfileQuery = {
  userId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  document: string;
  birthDate: string;
  gender: string;
  homePhone: string;
  passwordLastUpdate?: string;
};

export type ProfileCustomFieldsInput = {
  key: string;
  value: string;
};

export type ProfileVars = {
  birthDate: string | null;
  document: string;
  email: string;
  firstName: string;
  homePhone: string;
  lastName: string;
  userId: string;
  gender?: string;
};

export const profileQuery = gql`
  query Profile {
    profile(
      customFields: "profileImagePath,isNewsletterOptIn,userAcceptedTerms"
    ) @context(provider: "vtex.store-graphql") {
      userId
      firstName
      lastName
      email
      document
      birthDate
      homePhone
      gender
      customFields {
        cacheId
        key
        value
      }
      addresses {
        id
        postalCode
        city
        state
        country
        street
        number
        complement
        neighborhood
        receiverName
      }
      payments {
        id
        cardNumber
      }
    }
  }
`;

export const profileMutation = gql`
  mutation UpdateProfile(
    $fields: ProfileInput!
    $customFields: [ProfileCustomFieldInput]
  ) {
    updateProfile(fields: $fields, customFields: $customFields)
      @context(provider: "vtex.store-graphql") {
      userId
    }
  }
`;

export const profileMutationPassword = gql`
  mutation RedefinePassword(
    $email: String!
    $newPassword: String!
    $currentPassword: String!
  ) {
    redefinePassword(
      email: $email
      newPassword: $newPassword
      currentPassword: $currentPassword
    )
  }
`;
