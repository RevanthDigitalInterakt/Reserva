  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.apolloClientTesting = exports.apolloClientProduction = undefined;
  var linkTesting = (0, _$$_REQUIRE(_dependencyMap[0]).from)([_$$_REQUIRE(_dependencyMap[1]).authLinkHeader, _$$_REQUIRE(_dependencyMap[1]).authAfterware, _$$_REQUIRE(_dependencyMap[0]).ApolloLink.split(function (operation) {
    return operation.getContext().clientName === 'gateway';
  }, new (_$$_REQUIRE(_dependencyMap[2]).RetryLink)().concat(_$$_REQUIRE(_dependencyMap[3]).gatewayLink), _$$_REQUIRE(_dependencyMap[1]).directionalLinkTesting)]);
  var linkProduction = (0, _$$_REQUIRE(_dependencyMap[0]).from)([_$$_REQUIRE(_dependencyMap[1]).authLinkHeader, _$$_REQUIRE(_dependencyMap[1]).authAfterware, _$$_REQUIRE(_dependencyMap[0]).ApolloLink.split(function (operation) {
    return operation.getContext().clientName === 'gateway';
  }, new (_$$_REQUIRE(_dependencyMap[2]).RetryLink)().concat(_$$_REQUIRE(_dependencyMap[3]).gatewayLink), _$$_REQUIRE(_dependencyMap[1]).directionalLinkProduction)]);
  var apolloClientTesting = exports.apolloClientTesting = new (_$$_REQUIRE(_dependencyMap[0]).ApolloClient)({
    link: linkTesting,
    cache: new (_$$_REQUIRE(_dependencyMap[0]).InMemoryCache)()
  });
  var apolloClientProduction = exports.apolloClientProduction = new (_$$_REQUIRE(_dependencyMap[0]).ApolloClient)({
    link: linkProduction,
    cache: new (_$$_REQUIRE(_dependencyMap[0]).InMemoryCache)({
      resultCaching: true
    })
  });
