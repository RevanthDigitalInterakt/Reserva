  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MyWalletScreen = MyWalletScreen;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function MyWalletScreen() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[2]).useNavigation)();
    var navigateBack = function navigateBack() {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return;
      }
      navigation.dispatch(_$$_REQUIRE(_dependencyMap[2]).CommonActions.navigate({
        name: 'HomeTabs'
      }));
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).BaseScreen, {
      testID: "com.usereserva:id/MyWalletScreen",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).MyWalletContainer, {
        navigateBack: navigateBack
      })
    });
  }
