  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _CPFValidator = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _defaultErrors = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var DOCUMENTTEST = {
    name: 'isValidDocument',
    test: function test(currentDocument, context) {
      if (!currentDocument) return true;
      if (!(0, _CPFValidator.default)(currentDocument)) {
        return context.createError({
          message: _defaultErrors.default.customErros.document
        });
      }
      return true;
    }
  };
  var _default = exports.default = DOCUMENTTEST;
