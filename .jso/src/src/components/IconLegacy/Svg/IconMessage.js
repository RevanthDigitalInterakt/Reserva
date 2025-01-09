  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function IconMessage(_ref) {
    var color = _ref.color;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[2]).SvgIcon, {
      width: "100%",
      height: "100%",
      viewBox: "0 0 17 17.002",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).G, {
        transform: "translate(-359.095 -359.87)",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Path, {
          id: "a",
          fill: "none",
          stroke: color,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M375.595,368.371a8,8,0,0,1-12.447,6.651l-3.553,1.35,1.257-3.693a8,8,0,1,1,14.743-4.308Z",
          transform: "translate(0)"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).G, {
          transform: "translate(363.009 367.53)",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Circle, {
            id: "b",
            stroke: "none",
            fill: color,
            cx: "0.879",
            cy: "0.879",
            r: "0.879",
            transform: "translate(0)"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Circle, {
            id: "b",
            stroke: "none",
            fill: color,
            cx: "0.879",
            cy: "0.879",
            r: "0.879",
            transform: "translate(3.707)"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Circle, {
            id: "b",
            stroke: "none",
            fill: color,
            cx: "0.879",
            cy: "0.879",
            r: "0.879",
            transform: "translate(7.415)"
          })]
        })]
      })
    });
  }
  var _default = exports.default = IconMessage;
