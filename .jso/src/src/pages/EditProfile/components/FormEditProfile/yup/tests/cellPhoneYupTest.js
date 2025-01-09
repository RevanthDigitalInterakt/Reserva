  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _defaultErrors = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var RegexForValidationMaskCellPhone = new RegExp(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9 \d|[2-9])\d{3})\-?(\d{4}))$/);
  var RegexForValidationCellPhone = new RegExp(/^(?:(?:\+|00)?(55)\s?)(\d{11})$/);
  var maxLengthCellPhoneDontUseMask = 14;
  var CELLPHONETEST = {
    name: 'isValidCellPhone',
    test: function test(currentCellPhone, context) {
      if (!currentCellPhone) return true;
      if (currentCellPhone.length === maxLengthCellPhoneDontUseMask) {
        if (!RegexForValidationCellPhone.test(currentCellPhone)) {
          return context.createError({
            message: _defaultErrors.default.customErros.cellPhone
          });
        }
        return true;
      }
      if (!currentCellPhone.match(RegexForValidationMaskCellPhone)) {
        return context.createError({
          message: _defaultErrors.default.customErros.cellPhone
        });
      }
      return true;
    }
  };
  var _default = exports.default = CELLPHONETEST;
