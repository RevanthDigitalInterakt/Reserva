  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.removeSkuColorProductName = undefined;
  var removeSkuColorProductName = exports.removeSkuColorProductName = function removeSkuColorProductName(productName, skuColor) {
    if (!productName || !skuColor) {
      return productName;
    }
    var separatorLength = 1;
    var shouldRemoveSkuColor = productName.endsWith(skuColor);
    var removalIndex = productName.length - skuColor.length - separatorLength;
    return shouldRemoveSkuColor && removalIndex >= 0 ? productName.substring(0, removalIndex) : productName;
  };
