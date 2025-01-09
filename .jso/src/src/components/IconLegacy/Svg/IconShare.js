  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function IconShare(_ref) {
    var color = _ref.color;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[2]).SvgIcon, {
      width: "100%",
      height: "100%",
      viewBox: "0 0 14.489 15.998",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Path, {
        "data-name": "Icon ionic-md-share",
        d: "M16.567 14.429a2.2 2.2 0 00-1.574.6L9.222 11.7a2.7 2.7 0 00.081-.563 2.7 2.7 0 00-.081-.563l5.691-3.3a2.415 2.415 0 10-.767-1.769 2.687 2.687 0 00.081.563l-5.691 3.3a2.429 2.429 0 00-1.655-.643A2.389 2.389 0 004.5 11.133 2.43 2.43 0 008.576 12.9l5.731 3.336a2.016 2.016 0 00-.081.522 2.341 2.341 0 102.341-2.331z",
        transform: "translate(-4.5 -3.094)",
        fill: color
      })
    });
  }
  var _default = exports.default = IconShare;
