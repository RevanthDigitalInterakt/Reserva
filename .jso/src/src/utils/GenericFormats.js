  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.formatDate = exports.formatAndSearcFieldValue = undefined;
  var formatDate = exports.formatDate = function formatDate(date) {
    if (!date.length) return '';
    return (0, _$$_REQUIRE(_dependencyMap[0]).format)((0, _$$_REQUIRE(_dependencyMap[0]).addHours)(new Date(Date.parse(date)), 3), 'dd/MM/yyyy');
  };
  var formatAndSearcFieldValue = exports.formatAndSearcFieldValue = function formatAndSearcFieldValue(customFields, searchField, defaultReturn) {
    var fieldSearch = customFields.find(function (customField) {
      return customField.key === searchField;
    });
    if (fieldSearch) {
      if ('value' in fieldSearch) {
        if (fieldSearch.value === 'null' || !fieldSearch.value) return defaultReturn;
        return fieldSearch.value;
      }
    }
    return defaultReturn;
  };
