  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AppRouting = AppRouting;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _horizontalAnimationBackwards = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _Menu = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var RootStack = (0, _$$_REQUIRE(_dependencyMap[4]).createStackNavigator)();
  function AppRouting() {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(RootStack.Navigator, {
      initialRouteName: "Main",
      screenOptions: {
        headerShown: false
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(RootStack.Screen, {
        name: "Main",
        component: _$$_REQUIRE(_dependencyMap[6]).MainStackScreen,
        options: {
          headerShown: false
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(RootStack.Screen, {
        name: "Menu",
        options: _horizontalAnimationBackwards.default,
        component: _Menu.default
      })]
    });
  }
