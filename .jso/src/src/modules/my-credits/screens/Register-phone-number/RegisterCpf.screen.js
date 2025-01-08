  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RegisterCpfScreen = RegisterCpfScreen;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function RegisterCpfScreen(_ref) {
    var _route$params4;
    var route = _ref.route;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[2]).useNavigation)();
    var navigateBack = function navigateBack() {
      navigation.goBack();
    };
    var navigateToVerifyNumber = function navigateToVerifyNumber() {
      var _route$params, _route$params$profile;
      if (route != null && (_route$params = route.params) != null && (_route$params$profile = _route$params.profile) != null && _route$params$profile.homePhone) {
        var _route$params2;
        navigation.navigate('changePhoneNumber', {
          profile: route == null ? undefined : (_route$params2 = route.params) == null ? undefined : _route$params2.profile
        });
      } else {
        var _route$params3;
        navigation.navigate('registerPhoneNumber', {
          profile: route == null ? undefined : (_route$params3 = route.params) == null ? undefined : _route$params3.profile
        });
      }
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).BaseScreen, {
      testID: "com.usereserva:id/VerifyCpfScreen",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).RegisterCpfContainer, {
        profile: route == null ? undefined : (_route$params4 = route.params) == null ? undefined : _route$params4.profile,
        navigateBack: navigateBack,
        navigateToVerifyNumber: navigateToVerifyNumber
      })
    });
  }
