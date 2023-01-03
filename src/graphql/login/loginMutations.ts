import { gql } from '@apollo/client';

export const classicSignInMutation = gql`
  mutation ClassicSignIn($email: String!, $password: String!) {
    classicSignIn(email: $email, password: $password)
  }
`;

export const sendEmailVerificationMutation = gql`
  mutation SendEmailVerification($email: String!) {
    sendEmailVerification(email: $email)
  }
`;

export const recoveryPasswordMutation = gql`
  mutation RecoveryPassword( $email: String!, $newPassword: String!, $code: String!){
    recoveryPassword(email: $email , newPassword: $newPassword, code: $code)
  }
`;
export const accessKeySignInMutation = gql`
  mutation AccessKeySignIn($email: String!, $code: String!){
    accessKeySignIn(email: $email, code: $code)
  }
`;
