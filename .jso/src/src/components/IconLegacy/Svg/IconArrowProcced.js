  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function IconArrowProcced(_ref) {
    var color = _ref.color;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[2]).SvgIcon, {
      width: "100%",
      height: "100%",
      viewBox: "0 0 18.225 19.054",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).G, {
        id: "Seta_-_icon",
        "data-name": "Seta - icon",
        transform: "translate(1 1.414)",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Path, {
          id: "Caminho_68",
          "data-name": "Caminho 68",
          d: "M7.5,18H23.725",
          transform: "translate(-7.5 -9.887)",
          fill: "none",
          stroke: color,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Path, {
          id: "Caminho_69",
          "data-name": "Caminho 69",
          d: "M18,7.5l8.113,8.113L18,23.725",
          transform: "translate(-9.887 -7.5)",
          fill: "none",
          stroke: color,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2"
        })]
      })
    });
  }
  var _default = exports.default = IconArrowProcced;
