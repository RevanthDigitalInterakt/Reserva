  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.trackApolloError = trackApolloError;
  function extractOperationTransactionId(operation) {
    try {
      var ctx = operation.getContext();
      var headers = ctx.headers;
      return headers['x-transaction-id'];
    } catch (err) {
      return '';
    }
  }
  function trackApolloError(operation, errors, response) {
    try {
      var errorMessage = `Gateway Operation Error [${operation.operationName}]`;
      var transactionId = extractOperationTransactionId(operation);
      _$$_REQUIRE(_dependencyMap[0]).ExceptionProvider.captureException(new Error(errorMessage), {
        operationName: operation.operationName,
        variables: operation.variables,
        query: (0, _$$_REQUIRE(_dependencyMap[1]).print)(operation.query),
        response: response,
        errors: errors
      }, {
        transaction_id: transactionId
      });
    } catch (err) {
      //
    }
  }
