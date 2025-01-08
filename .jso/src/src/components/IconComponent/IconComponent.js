  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNativeAutoHeightImage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _icons = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _excluded = ["icon"];
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var defaultIconSize = 60;
  function IconComponent(_ref) {
    var icon = _ref.icon,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    if (!icon) {
      throw new Error('Required icon name');
    }
    if (Object.keys(_icons.svgs).includes(icon)) {
      var ComponentSvg = _icons.default[icon];
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(ComponentSvg, {});
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNativeAutoHeightImage.default, Object.assign({
      resizeMode: "contain",
      source: _icons.default[icon],
      width: defaultIconSize,
      height: defaultIconSize
    }, rest));
  }
  var _default = exports.default = (0, _react.memo)(IconComponent);
