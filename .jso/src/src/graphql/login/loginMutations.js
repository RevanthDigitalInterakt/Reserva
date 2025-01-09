  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.recoveryPasswordMutation = undefined;
  var recoveryPasswordMutation = exports.recoveryPasswordMutation = (0, _$$_REQUIRE(_dependencyMap[0]).gql)`
  mutation RecoveryPassword( $email: String!, $newPassword: String!, $code: String!){
    recoveryPassword(email: $email , newPassword: $newPassword, code: $code)
  }
`;
