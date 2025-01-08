  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RegisterPhoneNumberScreen = RegisterPhoneNumberScreen;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function RegisterPhoneNumberScreen(_ref) {
    var _route$params, _route$params2, _route$params3;
    var route = _ref.route;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[2]).useNavigation)();
    var navigateBack = function navigateBack() {
      navigation.goBack();
    };
    var navigateToNumberRegisteredSuccessfully = function navigateToNumberRegisteredSuccessfully() {
      navigation.navigate('numberRegisteredSuccessfully', {
        costumerDocument: route == null ? undefined : route.params.profile.document
      });
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).BaseScreen, {
      testID: "com.usereserva:id/",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).RegisterPhoneNumberContainer, {
        profile: route == null ? undefined : (_route$params = route.params) == null ? undefined : _route$params.profile,
        isChangeNumber: route == null ? undefined : (_route$params2 = route.params) == null ? undefined : _route$params2.isChangeNumber,
        confirmPhone: route == null ? undefined : (_route$params3 = route.params) == null ? undefined : _route$params3.confirmPhone,
        navigateBack: navigateBack,
        navigateToNumberRegisteredSuccessfully: navigateToNumberRegisteredSuccessfully
      })
    });
  }
