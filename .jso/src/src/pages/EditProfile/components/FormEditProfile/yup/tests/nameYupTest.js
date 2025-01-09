  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _defaultErrors = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var REGEX_FOR_VALIDATION_NAME = new RegExp(/^[a-zA-ZÀ-ú]{2,}\s[a-zA-ZÀ-ú ']{2,}$/);
  var NAMETEST = {
    name: 'isValidName',
    test: function test(currentName, context) {
      if (!currentName) return true;
      if (!REGEX_FOR_VALIDATION_NAME.test(currentName)) {
        return context.createError({
          message: _defaultErrors.default.customErros.name
        });
      }
      return true;
    }
  };
  var _default = exports.default = NAMETEST;
