  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.refreshTokenMiddleware = refreshTokenMiddleware;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function refreshTokenMiddleware(_x) {
    return _refreshTokenMiddleware.apply(this, arguments);
  }
  function _refreshTokenMiddleware() {
    _refreshTokenMiddleware = (0, _asyncToGenerator2.default)(function* (_ref) {
      var graphQLErrors = _ref.graphQLErrors,
        operation = _ref.operation,
        response = _ref.response;
      try {
        if (graphQLErrors != null && graphQLErrors.length) {
          var hasAuthenticationError = graphQLErrors.some(function (item) {
            return (item.message || '').toLowerCase() === _$$_REQUIRE(_dependencyMap[2]).INVALID_AUTHORIZATION_ERROR;
          });
          if (!hasAuthenticationError) return true;
          if (hasAuthenticationError && operation.operationName === 'refreshToken') {
            (0, _$$_REQUIRE(_dependencyMap[3]).trackApolloError)(operation, graphQLErrors, response);
            if (hasAuthenticationError) {
              (0, _$$_REQUIRE(_dependencyMap[4]).navigateUsingRef)('Login', {
                invalidSession: true
              });
            }
            return false;
          }
          var result = yield (0, _$$_REQUIRE(_dependencyMap[5]).onRefreshToken)(true);
          if (!result) return false;
          return true;
        }
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[6]).ExceptionProvider.captureException(e);
      }
      return true;
    });
    return _refreshTokenMiddleware.apply(this, arguments);
  }
