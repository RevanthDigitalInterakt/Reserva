  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MyCreditsScreensRoutes = exports.MyCreditsRoutes = undefined;
  var MyCreditsScreensRoutes = exports.MyCreditsScreensRoutes = /*#__PURE__*/function (MyCreditsScreensRoutes) {
    MyCreditsScreensRoutes["CREDITS"] = "credits";
    MyCreditsScreensRoutes["CASHBACK_IN_STORE"] = "cashbackInStore";
    MyCreditsScreensRoutes["REGISTER_PHONE_NUMBER"] = "registerPhoneNumber";
    MyCreditsScreensRoutes["CHANGE_PHONE_NUMBER"] = "changePhoneNumber";
    MyCreditsScreensRoutes["NUMBER_REGISTERED_SUCCESSFULLY"] = "numberRegisteredSuccessfully";
    MyCreditsScreensRoutes["REGISTER_CPF"] = "registerCPF";
    return MyCreditsScreensRoutes;
  }({});
  var MyCreditsRoutes = exports.MyCreditsRoutes = [{
    component: _$$_REQUIRE(_dependencyMap[0]).CreditsScreen,
    name: MyCreditsScreensRoutes.CREDITS
  }, {
    component: _$$_REQUIRE(_dependencyMap[1]).CashbackInStoreScreen,
    name: MyCreditsScreensRoutes.CASHBACK_IN_STORE
  }, {
    component: _$$_REQUIRE(_dependencyMap[2]).RegisterPhoneNumberScreen,
    name: MyCreditsScreensRoutes.REGISTER_PHONE_NUMBER
  }, {
    component: _$$_REQUIRE(_dependencyMap[3]).ChangePhoneNumberScreen,
    name: MyCreditsScreensRoutes.CHANGE_PHONE_NUMBER
  }, {
    component: _$$_REQUIRE(_dependencyMap[4]).RegisterCpfScreen,
    name: MyCreditsScreensRoutes.REGISTER_CPF
  }, {
    component: _$$_REQUIRE(_dependencyMap[5]).NumberRegisteredSuccessfullyScreen,
    name: MyCreditsScreensRoutes.NUMBER_REGISTERED_SUCCESSFULLY
  }];
