  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getProductCategories = undefined;
  var getProductCategories = exports.getProductCategories = function getProductCategories(categoryTree) {
    var categories = categoryTree == null ? undefined : categoryTree.map(function (item) {
      return item.replace(/-+/g, '-');
    }).join('-').toLowerCase();
    return categories;
  };
