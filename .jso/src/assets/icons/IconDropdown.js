  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = IconDropdown;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNativeSvg = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function IconDropdown(props) {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNativeSvg.default, Object.assign({
      width: 16,
      height: 16,
      viewBox: "0 -1 16 16",
      fill: "none"
    }, props, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNativeSvg.Path, {
        d: "M6.66669 4.66668L10 8.00001L6.66669 11.3333",
        stroke: "#969CA4",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      })
    }));
  }
