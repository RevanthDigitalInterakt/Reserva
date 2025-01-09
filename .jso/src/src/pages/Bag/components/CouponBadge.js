  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CouponBadge = CouponBadge;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CouponBadge(_ref) {
    var value = _ref.value,
      onPress = _ref.onPress,
      testID = _ref.testID;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsxs)(_$$_REQUIRE(_dependencyMap[2]).Box, {
      borderColor: "divider",
      borderWidth: "hairline",
      bg: "backgoundInput",
      flexDirection: "row",
      alignItems: "center",
      px: "micro",
      height: 34,
      alignSelf: "flex-start",
      borderRadius: "pico",
      marginTop: "nano",
      mr: "nano",
      testID: "com.usereserva:id/coupon-badge-container",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Typography, {
        fontFamily: "nunitoRegular",
        fontSize: 13,
        children: value
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Button, {
        onPress: onPress,
        marginLeft: "micro",
        variant: "icone",
        icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[5]).IconLegacy, {
          name: "Close",
          size: 10
        }),
        testID: testID
      })]
    });
  }
