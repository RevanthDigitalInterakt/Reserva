  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PriceCustom = PriceCustom;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function PriceCustom(_ref) {
    var num = _ref.num,
      sizeInteger = _ref.sizeInteger,
      sizeDecimal = _ref.sizeDecimal,
      negative = _ref.negative,
      fontFamily = _ref.fontFamily,
      color = _ref.color,
      lineThroughInteger = _ref.lineThroughInteger,
      lineThroughDecimal = _ref.lineThroughDecimal,
      lineHeight = _ref.lineHeight;
    var integerPart = function integerPart(numInteger) {
      return numInteger <= 0 ? Math.ceil(numInteger) : Math.floor(numInteger);
    };
    var decimalPart = function decimalPart(numDecimal) {
      var _ref2;
      return (_ref2 = `${numDecimal == null ? undefined : numDecimal.toFixed(2)}`) == null ? undefined : _ref2.split('.')[1];
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_reactNative.View, {
      style: {
        flexDirection: 'row'
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.View, {
        children: negative ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_reactNative.View, {
          style: {
            flexDirection: 'row'
          },
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_reactNative.Text, {
            style: {
              fontSize: (0, _$$_REQUIRE(_dependencyMap[3]).scale)(sizeInteger),
              fontFamily: fontFamily,
              color: color,
              lineHeight: lineHeight
            },
            children: ["- R$", ' ']
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.Text, {
            style: {
              fontSize: (0, _$$_REQUIRE(_dependencyMap[3]).scale)(sizeInteger),
              fontFamily: fontFamily,
              color: color,
              textDecorationLine: lineThroughInteger ? 'line-through' : 'none',
              lineHeight: lineHeight
            },
            children: integerPart(num)
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.Text, {
            style: {
              fontSize: (0, _$$_REQUIRE(_dependencyMap[3]).scale)(sizeInteger),
              fontFamily: fontFamily,
              color: color,
              lineHeight: lineHeight
            },
            children: ","
          })]
        }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_reactNative.View, {
          style: {
            flexDirection: 'row'
          },
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_reactNative.Text, {
            style: {
              fontSize: (0, _$$_REQUIRE(_dependencyMap[3]).scale)(sizeInteger),
              fontFamily: fontFamily,
              color: color,
              lineHeight: lineHeight
            },
            children: ["R$", ' ']
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.Text, {
            style: {
              fontSize: (0, _$$_REQUIRE(_dependencyMap[3]).scale)(sizeInteger),
              fontFamily: fontFamily,
              color: color,
              textDecorationLine: lineThroughInteger ? 'line-through' : 'none',
              lineHeight: lineHeight
            },
            children: integerPart(num)
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.Text, {
            style: {
              fontSize: (0, _$$_REQUIRE(_dependencyMap[3]).scale)(sizeInteger),
              fontFamily: fontFamily,
              color: color,
              lineHeight: lineHeight
            },
            children: ","
          })]
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.View, {
        style: {
          alignSelf: 'flex-start'
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.Text, {
          style: {
            fontSize: (0, _$$_REQUIRE(_dependencyMap[3]).scale)(sizeDecimal),
            fontFamily: fontFamily,
            color: color,
            textDecorationLine: lineThroughDecimal ? 'line-through' : 'none'
          },
          children: decimalPart(num)
        })
      })]
    });
  }
