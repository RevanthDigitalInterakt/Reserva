  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.postalCodeMask = undefined;
  var postalCodeMask = exports.postalCodeMask = function postalCodeMask(value) {
    if (value.length <= 8) {
      var newValue = value.replace(/(\d{5})(\d{3})/, '$1-$2');
      return newValue;
    }
    return '';
  };
