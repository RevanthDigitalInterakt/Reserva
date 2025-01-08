  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function IconCheckboxUnchecked(_ref) {
    var color = _ref.color;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[2]).SvgIcon, {
      width: "100%",
      height: "100%",
      viewBox: "0 0 15 15",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).G, {
        fill: "#fff",
        stroke: color,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Rect, {
          width: 15,
          height: 15,
          rx: 2,
          stroke: "none"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Rect, {
          x: 0.5,
          y: 0.5,
          width: 14,
          height: 14,
          rx: 1.5,
          fill: "none"
        })]
      })
    });
  }
  var _default = exports.default = IconCheckboxUnchecked;
