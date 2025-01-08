  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createZustandStoreWithSelectors = undefined;
  var createZustandStoreWithSelectors = exports.createZustandStoreWithSelectors = function createZustandStoreWithSelectors(store) {
    return function (keys) {
      return store(function (state) {
        var x = keys.reduce(function (acc, cur) {
          acc[cur] = state[cur];
          return acc;
        }, {});
        return x;
      }, _$$_REQUIRE(_dependencyMap[0]).shallow);
    };
  };
