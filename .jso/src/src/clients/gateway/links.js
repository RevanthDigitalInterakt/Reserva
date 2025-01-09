  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.transactionIdLink = exports.errorLinks = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var transactionIdLink = exports.transactionIdLink = (0, _$$_REQUIRE(_dependencyMap[2]).setContext)(/*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)(function* (_, _ref) {
      var headers = _ref.headers;
      var Authorization = (yield (0, _$$_REQUIRE(_dependencyMap[3]).getAsyncStorageItem)('Auth:Token')) || '';
      return {
        headers: Object.assign({}, headers, {
          'x-transaction-id': (0, _$$_REQUIRE(_dependencyMap[4]).v4)(),
          'x-api-key': _$$_REQUIRE(_dependencyMap[5]).Config.API_KEY_GATEWAY,
          Authorization: Authorization
        })
      };
    });
    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  var errorLinks = exports.errorLinks = (0, _$$_REQUIRE(_dependencyMap[6]).onError)(function (_ref3) {
    var graphQLErrors = _ref3.graphQLErrors,
      forward = _ref3.forward,
      operation = _ref3.operation,
      response = _ref3.response;
    if (graphQLErrors != null && graphQLErrors.length) {
      var hasAuthenticationError = graphQLErrors.some(function (item) {
        return (item.message || '').toLowerCase() === _$$_REQUIRE(_dependencyMap[7]).INVALID_AUTHORIZATION_ERROR;
      });
      (0, _$$_REQUIRE(_dependencyMap[8]).trackApolloError)(operation, graphQLErrors, response);
      if (hasAuthenticationError) {
        (0, _$$_REQUIRE(_dependencyMap[9]).navigateUsingRef)('Login', {
          invalidSession: true
        });
        return;
      }
    }
    forward(operation);
  });
