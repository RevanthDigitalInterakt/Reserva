  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var isValidCPF = function isValidCPF(val) {
    if (!val) return false;
    var cpf = val.replace(/[^\d]+/g, '');
    if (!cpf) return false;
    if (!cpf || cpf === '00000000000' || cpf === '11111111111' || cpf === '22222222222' || cpf === '33333333333' || cpf === '44444444444' || cpf === '55555555555' || cpf === '66666666666' || cpf === '77777777777' || cpf === '88888888888' || cpf === '99999999999') {
      return false;
    }
    var add = 0;
    for (var i = 0; i < 9; i += 1) {
      add += parseInt(cpf.charAt(i), 10) * (10 - i);
    }
    var rev = 11 - add % 11;
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9), 10)) return false;
    add = 0;
    for (var _i = 0; _i < 10; _i += 1) {
      add += parseInt(cpf.charAt(_i), 10) * (11 - _i);
    }
    rev = 11 - add % 11;
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10), 10)) return false;
    return true;
  };
  var _default = exports.default = isValidCPF;
