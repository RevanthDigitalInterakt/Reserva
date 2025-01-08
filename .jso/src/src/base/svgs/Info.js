  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Info;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeSvg = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function Info() {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_reactNativeSvg.default, {
      width: 24,
      height: 24,
      viewBox: "0 0 19 19",
      fill: "none",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeSvg.Circle, {
        cx: "9.63672",
        cy: "9.5",
        r: "6",
        stroke: "#E4002B",
        "stroke-width": "1.6"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeSvg.Path, {
        d: "M9.63672 6.125V10.2895M9.63672 12.1842V12.5",
        stroke: "#E4002B",
        strokeWidth: "1.6",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      })]
    });
  }
