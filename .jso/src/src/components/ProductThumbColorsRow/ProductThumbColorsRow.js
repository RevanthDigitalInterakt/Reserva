  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProductThumbColorsRow(_ref) {
    var identifier = _ref.identifier,
      colors = _ref.colors,
      _ref$limit = _ref.limit,
      limit = _ref$limit === undefined ? 4 : _ref$limit;
    var items = (0, _react.useMemo)(function () {
      return Array.from(new Set(colors));
    }, [colors]);
    if (!items.length) return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_reactNative.View, {
      style: _$$_REQUIRE(_dependencyMap[3]).styles.wrapper,
      children: [items.map(function (item, i) {
        return i < limit && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.View, {
          style: [_$$_REQUIRE(_dependencyMap[3]).styles.circleContainer, {
            backgroundColor: item
          }],
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.View, {
            style: [_$$_REQUIRE(_dependencyMap[3]).styles.circle, {
              backgroundColor: item
            }]
          })
        }, `colorthumb-${identifier}-${item}`);
      }), items.length > limit && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.Text, {
        style: _$$_REQUIRE(_dependencyMap[3]).styles.text,
        allowFontScaling: false,
        children: `+${items.length - limit}`
      })]
    });
  }
  var _default = exports.default = ProductThumbColorsRow;
