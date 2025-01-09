  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = IconChevronRightSmall;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNativeSvg = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function IconChevronRightSmall(props) {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNativeSvg.default, Object.assign({
      width: 6,
      height: 10,
      viewBox: "0 0 6 10",
      fill: "none"
    }, props, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNativeSvg.Path, {
        d: "M1.667 1.667L5 5 1.667 8.333",
        stroke: "#A6A6A6",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      })
    }));
  }
