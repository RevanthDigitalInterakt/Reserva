  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CategoriesParserString = undefined;
  var CategoriesParserString = exports.CategoriesParserString = function CategoriesParserString(categories) {
    if (Array.isArray(categories)) {
      return categories;
    }
    var categoriesKeys = Object.keys(categories);
    var names = categories = categoriesKeys.map(function (categoriesKey) {
      var categoryName = categories[categoriesKey];
      return categoryName;
    });
    return names.join();
  };
