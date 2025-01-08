  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNativeSvg = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ArrowBack(props) {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_reactNativeSvg.default, Object.assign({
      width: 17,
      height: 16,
      viewBox: "0 0 17 16",
      fill: "none"
    }, props, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNativeSvg.G, {
        clipPath: "url(#clip0_1834_506)",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNativeSvg.Path, {
          d: "M2.333 7.333a.667.667 0 000 1.334V7.333zm13.805 1.138a.667.667 0 000-.942l-4.243-4.243a.667.667 0 00-.942.943l3.77 3.77-3.77 3.772a.667.667 0 00.943.943l4.242-4.243zm-13.805.196h13.334V7.333H2.333v1.334z",
          fill: "#848484"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNativeSvg.Defs, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNativeSvg.ClipPath, {
          id: "clip0_1834_506",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNativeSvg.Path, {
            fill: "#fff",
            transform: "rotate(180 8.5 8)",
            d: "M0 0H16.0994V16H0z"
          })
        })
      })]
    }));
  }
  var _default = exports.default = ArrowBack;
