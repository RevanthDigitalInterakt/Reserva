  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNativeSvg = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CheckedRounded(props) {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNativeSvg.default, Object.assign({
      width: 48,
      height: 48,
      viewBox: "0 0 48 48",
      fill: "none"
    }, props, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNativeSvg.Path, {
        d: "M24 .667C11.12.667.667 11.12.667 24 .667 36.88 11.12 47.333 24 47.333c12.88 0 23.333-10.453 23.333-23.333C47.333 11.12 36.88.667 24 .667zm0 42C13.71 42.667 5.333 34.29 5.333 24 5.333 13.71 13.71 5.333 24 5.333c10.29 0 18.667 8.377 18.667 18.667 0 10.29-8.377 18.667-18.667 18.667zm10.71-28.98L19.333 29.063l-6.043-6.02-3.29 3.29 9.333 9.334L38 17l-3.29-3.313z",
        fill: "#344037"
      })
    }));
  }
  var _default = exports.default = CheckedRounded;
