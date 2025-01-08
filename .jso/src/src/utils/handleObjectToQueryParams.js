  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.handleObjectToQueryParams = undefined;
  var handleObjectToQueryParams = exports.handleObjectToQueryParams = function handleObjectToQueryParams(objectParams, validKeys) {
    var filteredParams = (0, _$$_REQUIRE(_dependencyMap[0]).filterValidParams)(objectParams, validKeys);
    return (0, _$$_REQUIRE(_dependencyMap[1]).buildQueryParams)(filteredParams);
  };
