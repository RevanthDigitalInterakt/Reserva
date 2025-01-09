  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function IconCrosshair(_ref) {
    var color = _ref.color;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[2]).SvgIcon, {
      width: "100%",
      height: "100%",
      viewBox: "0 0 27.385 27.385",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).G, {
        transform: "translate(-576.815 -589.333)",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Circle, {
          cx: "8.805",
          cy: "8.805",
          r: "8.805",
          transform: "translate(581.702 593.989)",
          fill: "none",
          stroke: color,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Circle, {
          cx: "4.634",
          cy: "4.634",
          r: "4.634",
          transform: "translate(585.873 598.16)",
          fill: color
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).G, {
          transform: "translate(590.507 590.333)",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Line, {
            y2: "3.656",
            fill: "none",
            stroke: color,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Line, {
            y2: "3.656",
            transform: "translate(0 21.729)",
            fill: "none",
            stroke: color,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2"
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).G, {
          transform: "translate(577.815 603.026)",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Line, {
            x1: "3.656",
            transform: "translate(21.729)",
            fill: "none",
            stroke: color,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Line, {
            x1: "3.656",
            fill: "none",
            stroke: color,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2"
          })]
        })]
      })
    });
  }
  var _default = exports.default = IconCrosshair;
