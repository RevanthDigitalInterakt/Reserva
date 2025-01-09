  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.profileQuery = exports.profileMutationPassword = exports.profileMutation = undefined;
  var profileQuery = exports.profileQuery = (0, _$$_REQUIRE(_dependencyMap[0]).gql)`
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
  var profileMutation = exports.profileMutation = (0, _$$_REQUIRE(_dependencyMap[0]).gql)`
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
  var profileMutationPassword = exports.profileMutationPassword = (0, _$$_REQUIRE(_dependencyMap[0]).gql)`
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
