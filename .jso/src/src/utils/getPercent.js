  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getPercent = undefined;
  var getPercent = exports.getPercent = function getPercent(sellingPrice, listPrice) {
    if (sellingPrice >= listPrice) {
      return undefined;
    }
    return Math.round((listPrice - sellingPrice) * 100 / listPrice);
  };
