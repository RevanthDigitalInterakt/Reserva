  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.handleCopyTextToClipboard = exports.getCopiedValue = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _clipboard = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var handleCopyTextToClipboard = exports.handleCopyTextToClipboard = function handleCopyTextToClipboard(text) {
    _clipboard.default.setString(text);
  };
  var getCopiedValue = exports.getCopiedValue = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* () {
      var content = yield _clipboard.default.getString();
      return content;
    });
    return function getCopiedValue() {
      return _ref.apply(this, arguments);
    };
  }();
