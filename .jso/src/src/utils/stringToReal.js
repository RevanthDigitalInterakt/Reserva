  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.stringToReal = undefined;
  var stringToReal = exports.stringToReal = function stringToReal(value) {
    var _number$;
    if (!value) {
      return '';
    }
    var valueWithDot = `${value == null ? undefined : value.slice(0, value.length - 2)}.${value == null ? undefined : value.slice(-2)}`;
    var number = Number(valueWithDot).toFixed(2).split('.');
    number[0] = `R$ ${(_number$ = number[0]) == null ? undefined : _number$.split(/(?=(?:...)*$)/).join('.')}`;
    var formatted = number.join(',');
    if (formatted === 'R$ NaN') {
      return '';
    }
    return number.join(',');
  };
