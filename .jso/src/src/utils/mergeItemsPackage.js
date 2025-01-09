  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.mergeItemsPackage = undefined;
  var mergeItemsPackage = exports.mergeItemsPackage = function mergeItemsPackage(packageItems) {
    return packageItems.map(function (subPackage) {
      return subPackage.items.map(function (item) {
        return item;
      });
    }).flat();
  };
