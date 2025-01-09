  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TopBar = TopBar;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _Bar = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _excluded = ["showLogo", "leftButton", "rightButton1", "rightButton2", "loading"];
  function TopBar(_ref) {
    var _ref$showLogo = _ref.showLogo,
      showLogo = _ref$showLogo === undefined ? true : _ref$showLogo,
      leftButton = _ref.leftButton,
      rightButton1 = _ref.rightButton1,
      rightButton2 = _ref.rightButton2,
      _ref$loading = _ref.loading,
      loading = _ref$loading === undefined ? false : _ref$loading,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[7]).usePrimeInfo)(),
      isPrime = _usePrimeInfo.isPrime,
      primeActive = _usePrimeInfo.primeActive;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.SafeAreaView, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, Object.assign({
        justifyContent: "flex-end"
      }, props, {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingX: "micro",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            width: "25%",
            flexDirection: "row",
            alignItems: "flex-start",
            alignSelf: "center",
            children: leftButton !== undefined && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Button, Object.assign({
              justifyContent: "flex-end",
              hitSlop: {
                top: 20,
                left: 20,
                bottom: 20,
                right: 20
              },
              leftIcon: {
                type: 'icon',
                key: 'left-icon',
                props: Object.assign({}, leftButton)
              }
            }, (0, _testProps.default)(leftButton.testID), {
              onPress: leftButton.onPress
            }))
          }), showLogo ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            width: "50%",
            justifyContent: "flex-start",
            alignItems: "center",
            alignSelf: "center",
            children: isPrime && primeActive ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_IconComponent.default, {
              icon: "logoPrime"
            }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).IconLegacy, {
              name: "Logo",
              color: "vermelhoAlerta",
              size: 24
            })
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            width: "50%",
            justifyContent: "flex-start",
            alignItems: "center",
            alignSelf: "flex-start"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            width: "25%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            alignSelf: "center",
            children: [rightButton1 !== undefined && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Button, Object.assign({
              hitSlop: {
                top: 20,
                left: 20,
                bottom: 20,
                right: 20
              },
              leftIcon: {
                type: 'icon',
                key: 'right-icon',
                props: Object.assign({}, rightButton1)
              }
            }, (0, _testProps.default)(rightButton1.testID), {
              onPress: rightButton1.onPress,
              mr: rightButton2 ? 20 : 0
            })), rightButton2 !== undefined && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Button, Object.assign({
              variant: "icone",
              hitSlop: {
                top: 25,
                left: 25,
                bottom: 25,
                right: 25
              },
              icon: {
                props: Object.assign({}, rightButton2)
              }
            }, (0, _testProps.default)(rightButton2.testID), {
              onPress: rightButton2.onPress,
              badgeCount: rightButton2.badgeCount
            }))]
          })]
        }), loading && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          top: 0,
          height: 1,
          justifyContent: "flex-end",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_Bar.default, {
            animated: true,
            indeterminate: true,
            color: _$$_REQUIRE(_dependencyMap[12]).theme.colors.vermelhoAlerta,
            height: 2,
            borderWidth: 0,
            width: null,
            borderRadius: 0
          })
        })]
      }))
    });
  }
