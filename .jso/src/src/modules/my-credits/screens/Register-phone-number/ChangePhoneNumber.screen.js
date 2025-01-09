  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ChangePhoneNumberScreen = ChangePhoneNumberScreen;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function ChangePhoneNumberScreen(_ref) {
    var _route$params;
    var route = _ref.route;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[2]).useNavigation)();
    var navigateBack = function navigateBack() {
      navigation.goBack();
    };
    var navigateToRegisterPhoneNumber = function navigateToRegisterPhoneNumber() {
      navigation.navigate('registerPhoneNumber', {
        isChangeNumber: true,
        profile: route == null ? undefined : route.params.profile
      });
    };
    var navigateToConfirmPhone = function navigateToConfirmPhone() {
      navigation.navigate('registerPhoneNumber', {
        confirmPhone: true,
        profile: route == null ? undefined : route.params.profile
      });
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).BaseScreen, {
      testID: "com.usereserva:id/ChangePhoneNumberScreen",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).ChangePhoneNumberContainer, {
        profile: route == null ? undefined : (_route$params = route.params) == null ? undefined : _route$params.profile,
        navigateBack: navigateBack,
        navigateToRegisterPhoneNumber: navigateToRegisterPhoneNumber,
        navigateToConfirmPhone: navigateToConfirmPhone
      })
    });
  }
