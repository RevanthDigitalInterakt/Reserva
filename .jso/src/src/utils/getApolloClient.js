  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getApolloClient = undefined;
  var client;
  var getApolloClient = exports.getApolloClient = function getApolloClient() {
    var isTesting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!client) {
      client = isTesting ? _$$_REQUIRE(_dependencyMap[0]).apolloClientTesting : _$$_REQUIRE(_dependencyMap[0]).apolloClientProduction;
    }
    var existingCache = client.extract();
    client.cache.restore(existingCache);
    return client;
  };
