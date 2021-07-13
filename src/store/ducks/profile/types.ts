import { gql } from '@apollo/client';

export enum ProfileTypes {
  REGISTER_REQUEST = '@profile/REGISTER_REQUEST',
  REQUEST_SUCCESS = '@profile/REQUEST_SUCCESS',
  REQUEST_FAILURE = '@profile/REQUEST_FAILURE',
  PROFILE_UPDATE = '@profile/PROFILE_UPDATE',
  PROFILE_LOAD = '@profile/PROFILE_LOAD',
  PROFILE_DELETE = '@profile/PROFILE_DELETE',
}

export interface Profile {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  receiveEmail?: string; //yes
  gender?: string; //male
  fullName?: string;
  phone?: string;
  ddd?: string;
  rsvCPF?: string; //"74634434008",
  rsvBirthDate?: string; //"1953-02-12T00?:00?:00.000Z",
  rsvPhoneNumber?: string; //"34524562456"
}

export interface ProfileState {
  readonly data?: Profile;
  readonly loading: boolean;
  readonly error: boolean;
}

export type ProfileQuery = {
  userId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  document: string;
  birthDate: string;
  homePhone: string;
  passwordLastUpdate?: string;
};

export type ProfileCustomFieldsInput = {
  key: string,
  value: string
}

export const profileQuery = gql`
  query Profile {
    profile(customFields: "isNewsletterOptIn") @context(provider: "vtex.store-graphql") {
      userId
      firstName
      lastName
      email
      document
      birthDate
      homePhone
      customFields{
        cacheId,
        key,
        value
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
    $fields: ProfileInput!, 
    $customFields: [ProfileCustomFieldInput]
    ){
    updateProfile(
      fields: $fields, 
      customFields: $customFields
      )@context(provider: "vtex.store-graphql") {
      userId,
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
