  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function IconTag(_ref) {
    var color = _ref.color;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsxs)(_$$_REQUIRE(_dependencyMap[2]).SvgIcon, {
      width: "100%",
      height: "100%",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Path, {
        d: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z",
        fill: "none"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Circle, {
        cx: 7,
        cy: 7,
        r: 0.5
      })]
    });
  }
  var _default = exports.default = IconTag;
