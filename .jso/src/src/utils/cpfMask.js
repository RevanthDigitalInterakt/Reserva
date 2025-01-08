  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cpfMask = undefined;
  var cpfMask = exports.cpfMask = function cpfMask(value) {
    if (value.length <= 14) {
      var newValue = value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2');
      return newValue;
    }
    return '';
  };
