  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var subscribeNewsLetter = (0, _$$_REQUIRE(_dependencyMap[0]).gql)`
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
  var _default = exports.default = subscribeNewsLetter;
