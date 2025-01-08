  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CreditsScreen = CreditsScreen;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function CreditsScreen() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[2]).useNavigation)();
    var navigateBack = function navigateBack() {
      navigation.goBack();
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).BaseScreen, {
      testID: "com.usereserva:id/CreditsScreen",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).CreditsContainer, {
        navigateBack: navigateBack
      })
    });
  }
