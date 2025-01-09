  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.refreshTokenLink = exports.gatewayLink = undefined;
  var refreshTokenLink = exports.refreshTokenLink = (0, _$$_REQUIRE(_dependencyMap[0]).onError)(function (_ref) {
    var graphQLErrors = _ref.graphQLErrors,
      forward = _ref.forward,
      operation = _ref.operation,
      response = _ref.response;
    if (graphQLErrors != null && graphQLErrors.length) {
      return new (_$$_REQUIRE(_dependencyMap[1]).Observable)(function (observer) {
        (0, _$$_REQUIRE(_dependencyMap[2]).refreshTokenMiddleware)({
          graphQLErrors: graphQLErrors,
          forward: forward,
          operation: operation,
          response: response
        }).then(function (retry) {
          if (!retry) return;
          var subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          };

          // Retry last failed request
          forward(operation).subscribe(subscriber);
        });
      });
    }
    return forward(operation);
  });
  var gatewayLink = exports.gatewayLink = _$$_REQUIRE(_dependencyMap[3]).errorLinks.concat(refreshTokenLink.concat(_$$_REQUIRE(_dependencyMap[3]).transactionIdLink.concat(new (_$$_REQUIRE(_dependencyMap[1]).HttpLink)({
    uri: _$$_REQUIRE(_dependencyMap[4]).Config.URL_GATEWAY_CLIENT
  }))));
