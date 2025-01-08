  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NumberRegisteredSuccessfullyScreen = NumberRegisteredSuccessfullyScreen;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function NumberRegisteredSuccessfullyScreen(_ref) {
    var route = _ref.route;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[2]).useNavigation)();
    var navigateBack = function navigateBack() {
      navigation.goBack();
    };
    var navigateToCashbackInStore = function navigateToCashbackInStore() {
      navigation.navigate('cashbackInStore', {
        isLoyal: true,
        costumerDocument: route.params.costumerDocument
      });
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).BaseScreen, {
      testID: "com.usereserva:id/NumberRegisteredSuccessfullyScreen",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).NumberRegisteredSuccessfullyContainer, {
        navigateBack: navigateBack,
        navigateToCashbackInStore: navigateToCashbackInStore
      })
    });
  }
