  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getBrands = undefined;
  var getBrands = exports.getBrands = function getBrands(items) {
    var brandNames = items == null ? undefined : items.map(function (item) {
      var _item$additionalInfo;
      return (item == null ? undefined : (_item$additionalInfo = item.additionalInfo) == null ? undefined : _item$additionalInfo.brandName) || '';
    });
    return brandNames ? brandNames == null ? undefined : brandNames.join(',') : '';
  };
