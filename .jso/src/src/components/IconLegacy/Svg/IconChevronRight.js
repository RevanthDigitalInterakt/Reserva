  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function IconChevronRight(_ref) {
    var color = _ref.color;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[2]).SvgIcon, {
      width: "100%",
      height: "100%",
      viewBox: "0 0 14.137 24.22",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).G, {
        "data-name": "Arrow - icon",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Path, {
          "data-name": "right001 - E012",
          d: "M0 1.539L1.539 0l10.06 10.08L21.681 0l1.539 1.539-11.621 11.6-4.343-4.344z",
          fill: color,
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 1,
          transform: "rotate(-90 12.11 11.61)"
        })
      })
    });
  }
  var _default = exports.default = IconChevronRight;
