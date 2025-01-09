  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.integerPart = exports.decimalPart = undefined;
  var integerPart = exports.integerPart = function integerPart(num) {
    return Math.floor(num);
  };
  var decimalPart = exports.decimalPart = function decimalPart(num) {
    return `${num == null ? undefined : num.toFixed(2)}`.split('.')[1] || '';
  };
