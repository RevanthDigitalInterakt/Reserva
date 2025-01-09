  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useApolloClientHook;
  var _react = _$$_REQUIRE(_dependencyMap[0]);
  function useApolloClientHook(isTesting) {
    var client = (0, _react.useMemo)(function () {
      return isTesting ? _$$_REQUIRE(_dependencyMap[1]).apolloClientTesting : _$$_REQUIRE(_dependencyMap[1]).apolloClientProduction;
    }, [isTesting]);
    return client;
  }
