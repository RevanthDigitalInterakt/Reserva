import { gql } from '@apollo/client';

export const recoveryPassword = gql`
    mutation RecoveryPassword($email: String! ,$newPassword: String!,$code: String!){
        recoveryPassword(email:$email, newPassword:$newPassword, code:$code,)
    }
`;
