  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.refreshTokenProductionLink = exports.refreshTokenApolloClient = undefined;
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var refreshTokenGatewayLink = _$$_REQUIRE(_dependencyMap[2]).errorLinks.concat(_$$_REQUIRE(_dependencyMap[2]).transactionIdLink.concat(new (_$$_REQUIRE(_dependencyMap[3]).HttpLink)({
    uri: _reactNativeConfig.default.URL_GATEWAY_CLIENT
  })));
  var refreshTokenProductionLink = exports.refreshTokenProductionLink = (0, _$$_REQUIRE(_dependencyMap[3]).from)([_$$_REQUIRE(_dependencyMap[4]).authLinkHeader, _$$_REQUIRE(_dependencyMap[4]).authAfterware, _$$_REQUIRE(_dependencyMap[3]).ApolloLink.split(function (operation) {
    return operation.getContext().clientName === 'gateway';
  }, new (_$$_REQUIRE(_dependencyMap[5]).RetryLink)().concat(refreshTokenGatewayLink), _$$_REQUIRE(_dependencyMap[4]).directionalLinkProduction)]);
  var refreshTokenApolloClient = exports.refreshTokenApolloClient = new (_$$_REQUIRE(_dependencyMap[3]).ApolloClient)({
    link: refreshTokenProductionLink,
    cache: new (_$$_REQUIRE(_dependencyMap[3]).InMemoryCache)()
  });
