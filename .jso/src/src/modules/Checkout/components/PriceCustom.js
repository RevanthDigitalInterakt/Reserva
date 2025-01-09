  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PriceCustom = PriceCustom;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function PriceCustom(_ref) {
    var num = _ref.num,
      fontFamily = _ref.fontFamily,
      sizeInterger = _ref.sizeInterger,
      sizeDecimal = _ref.sizeDecimal,
      negative = _ref.negative,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? 'preto' : _ref$color;
    var integerPart = function integerPart(numInteger) {
      return numInteger <= 0 ? Math.ceil(numInteger) : Math.floor(numInteger);
    };
    var decimalPart = function decimalPart(numDecimal) {
      var _ref2;
      return (_ref2 = `${numDecimal == null ? undefined : numDecimal.toFixed(2)}`) == null ? undefined : _ref2.split('.')[1];
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsxs)(_$$_REQUIRE(_dependencyMap[2]).Box, {
      flexDirection: "row",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[2]).Box, {
        children: negative ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).Typography, {
          color: color,
          fontFamily: fontFamily,
          fontSize: sizeInterger,
          children: ["- R$", integerPart(num), ","]
        }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).Typography, {
          color: color,
          fontFamily: fontFamily,
          fontSize: sizeInterger,
          children: ["R$", integerPart(num), ","]
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[2]).Box, {
        alignSelf: "flex-start",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Typography, {
          color: color,
          fontFamily: fontFamily,
          fontSize: sizeDecimal,
          children: decimalPart(num)
        })
      })]
    });
  }
