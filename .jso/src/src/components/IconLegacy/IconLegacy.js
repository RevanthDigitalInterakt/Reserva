  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.IconLegacy = IconLegacy;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNativeSvg = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _native = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var SvgIconList = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[6]));
  var _excluded = ["name"];
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var SvgIcon = (0, _native.default)(_reactNativeSvg.default)`
  ${_$$_REQUIRE(_dependencyMap[7]).color}
  ${_$$_REQUIRE(_dependencyMap[7]).layout}
  ${_$$_REQUIRE(_dependencyMap[7]).space}
  ${_$$_REQUIRE(_dependencyMap[7]).border}
`;
  function IconLegacy(_ref) {
    var name = _ref.name,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var colorSelected = props.color ? _$$_REQUIRE(_dependencyMap[8]).theme.colors[props.color] : _$$_REQUIRE(_dependencyMap[8]).theme.colors.preto;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(SvgIcon, Object.assign({
      color: "preto"
    }, props, {
      children: Object.entries(SvgIconList).map(function (_ref2) {
        var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
          key = _ref3[0],
          Component = _ref3[1];
        return `Icon${name}` == key && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(Component, {
          color: colorSelected
        }, `icon-${name}`);
      })
    }));
  }
