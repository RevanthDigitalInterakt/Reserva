  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _defaultErrors = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var REGEX_FOR_VALIDATION_BIRTH_DATE = new RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);
  var BIRTHDATETEST = {
    name: 'isVAlidBirthDate',
    test: function test(currentBirthDate, context) {
      if (!currentBirthDate) return true;
      if (!REGEX_FOR_VALIDATION_BIRTH_DATE.test(currentBirthDate)) {
        return context.createError({
          message: _defaultErrors.default.customErros.birthDate
        });
      }
      return true;
    }
  };
  var _default = exports.default = BIRTHDATETEST;
