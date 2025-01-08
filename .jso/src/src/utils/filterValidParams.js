  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.filterValidParams = undefined;
  var filterValidParams = exports.filterValidParams = function filterValidParams(objectParams, validKeys) {
    return validKeys.reduce(function (acc, key) {
      if (objectParams[key] && objectParams[key] !== 'null') acc[key] = objectParams[key];
      return acc;
    }, {});
  };
