  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BottomBar = BottomBar;
  exports.BottomBarButton = BottomBarButton;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _IconComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _Personalize = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var screenWidth = _reactNative.Dimensions.get('window').width;
  function BottomBarButton(_ref) {
    var iconName = _ref.iconName,
      _onPress = _ref.onPress,
      isSlected = _ref.isSlected,
      label = _ref.label,
      testID = _ref.testID,
      accessibilityLabel = _ref.accessibilityLabel,
      hidden = _ref.hidden;
    var renderIcon = (0, _react.useCallback)(function (nameIcon) {
      if (nameIcon === 'FacaVc') {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_Personalize.default, {});
      }
      if (nameIcon === 'Roulet') {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_IconComponent.default, {
          icon: "roulet",
          style: {
            width: 25,
            height: 25,
            marginBottom: 4
          }
        });
      }
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).IconLegacy, {
        name: nameIcon,
        color: "preto",
        size: 25,
        mb: 4
      });
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
      mx: "micro",
      width: screenWidth / 5,
      margin: 0,
      style: {
        display: hidden ? 'none' : 'flex'
      },
      onPress: function onPress() {
        return _onPress();
      },
      testID: testID,
      accessibilityLabel: accessibilityLabel,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Fragment, {
        children: [renderIcon(iconName), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
          fontSize: "9px",
          fontFamily: "nunitoRegular",
          color: isSlected ? 'vermelhoAlerta' : 'preto',
          children: label
        })]
      })
    });
  }
  function BottomBar(_ref2) {
    var children = _ref2.children;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
      style: {
        elevation: 10
      },
      boxShadow: _reactNative.Platform.OS === 'ios' ? 'bottomBarShadow' : null,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      height: 57,
      bg: "white",
      children: children
    });
  }
