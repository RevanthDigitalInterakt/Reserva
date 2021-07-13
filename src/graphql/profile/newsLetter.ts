import { gql } from "@apollo/client";

export const subscribeNewsLetter = gql`
  mutation SubscribeNewsletter(
    $email: String!, 
    $isNewsletterOptIn: Boolean!, 
    $fields: NewsletterFieldsInput
  ) {
    subscribeNewsletter(
      email: $email, 
      isNewsletterOptIn: $isNewsletterOptIn, 
      fields: $fields
      )
  }
`