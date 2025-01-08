  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.removeLastCharacterSlash = undefined;
  var removeLastCharacterSlash = exports.removeLastCharacterSlash = function removeLastCharacterSlash(value) {
    if (value[value.length - 1] === '/') {
      return value.slice(0, -1);
    }
    return value;
  };
