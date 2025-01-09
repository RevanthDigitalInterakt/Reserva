  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = CloseIcon;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeSvg = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CloseIcon(_ref) {
    var _ref$color = _ref.color,
      color = _ref$color === undefined ? '#541E1D' : _ref$color;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeSvg.default, {
      width: 14,
      height: 12,
      viewBox: "0 0 14 12",
      fill: "none",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeSvg.Path, {
        d: "M2.39709 0.000153443C2.25412 0.000153443 2.111 0.0533168 2.00204 0.159951L0.884555 1.25083C0.666086 1.4641 0.666086 1.8094 0.884555 2.02212L4.95946 6L0.884555 9.97788C0.666086 10.1911 0.666086 10.5364 0.884555 10.7492L2.00204 11.84C2.22051 12.0533 2.57423 12.0533 2.79214 11.84L6.86704 7.86217L10.9419 11.84C11.1599 12.0533 11.5141 12.0533 11.732 11.84L12.8495 10.7492C13.068 10.5359 13.068 10.1906 12.8495 9.97788L8.77463 6L12.8495 2.02212C13.068 1.8094 13.068 1.46355 12.8495 1.25083L11.732 0.159951C11.5136 -0.0533168 11.1599 -0.0533168 10.9419 0.159951L6.86704 4.13783L2.79214 0.159951C2.68291 0.0533168 2.54006 0.000153443 2.39709 0.000153443Z",
        fill: color
      })
    });
  }
