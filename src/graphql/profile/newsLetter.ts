import { gql } from '@apollo/client';

const subscribeNewsLetter = gql`
  mutation SubscribeNewsletter(
    $email: String!, 
    $isNewsletterOptIn: Boolean!, 
    $fields: NewsletterFieldsInput
  ){
    subscribeNewsletter(
      email: $email, 
      isNewsletterOptIn: $isNewsletterOptIn, 
      fields: $fields
      )
  }
`;

export default subscribeNewsLetter;
