  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function MenuBreadcrumb(_ref) {
    var title = _ref.title,
      onPress = _ref.onPress;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[2]).Button, {
      onPress: onPress,
      alignSelf: "flex-start",
      testID: "com.usereserva:id/button_menu_initial",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).Box, {
        testID: "com.usereserva:id/menu_initial_container",
        alignSelf: "flex-start",
        paddingX: "micro",
        paddingTop: "nano",
        alignItems: "center",
        flexDirection: "row",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[4]).IconLegacy, {
          name: "MenuArrowBack",
          color: "preto",
          size: 22
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Box, {
          paddingX: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[1]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
            fontSize: 12,
            fontFamily: "nunitoRegular",
            children: title
          })
        })]
      })
    });
  }
  var _default = exports.default = MenuBreadcrumb;
