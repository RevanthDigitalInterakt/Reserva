import { gql } from "@apollo/client";

export const classicSignInMutation = gql`
  mutation ClassicSignIn($email: String!, $password: String!) {
    classicSignIn(email: $email, password: $password)
  }
`;