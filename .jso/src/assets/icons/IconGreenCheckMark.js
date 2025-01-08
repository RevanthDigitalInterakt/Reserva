  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = IconGreenCheckMark;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeSvg = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function IconGreenCheckMark(props) {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_reactNativeSvg.default, Object.assign({
      width: "12",
      height: "12",
      viewBox: "0 0 12 12",
      fill: "none"
    }, props, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeSvg.Circle, {
        cx: "6",
        cy: "6",
        r: "5.5",
        fill: "#38A138",
        stroke: "#38A138"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeSvg.Path, {
        d: "M4.74984 7.74998L2.99984 5.99998L2.4165 6.58331L4.74984 8.91665L9.74984 3.91665L9.1665 3.33331L4.74984 7.74998Z",
        fill: "white"
      })]
    }));
  }
