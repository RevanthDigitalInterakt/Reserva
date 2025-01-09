  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RefreshTokenError = undefined;
  var _createClass2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _classCallCheck2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _possibleConstructorReturn2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _getPrototypeOf2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _inherits2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _wrapNativeSuper2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var RefreshTokenError = exports.RefreshTokenError = /*#__PURE__*/function (_Error) {
    function RefreshTokenError() {
      (0, _classCallCheck2.default)(this, RefreshTokenError);
      return _callSuper(this, RefreshTokenError, ['Refresh token error']);
    }
    (0, _inherits2.default)(RefreshTokenError, _Error);
    return (0, _createClass2.default)(RefreshTokenError);
  }(/*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));
