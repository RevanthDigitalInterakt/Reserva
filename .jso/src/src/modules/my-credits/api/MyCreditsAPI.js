  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MyCreditsAPI = exports.CashbackHttpUrl = undefined;
  var CashbackHttpUrl = exports.CashbackHttpUrl = /*#__PURE__*/function (CashbackHttpUrl) {
    CashbackHttpUrl["GetCustomer"] = "/loyalty/customer";
    CashbackHttpUrl["AcceptLoyalty"] = "/loyalty/accept-loyalty";
    CashbackHttpUrl["ModifyToken"] = "/loyalty/modify-token";
    CashbackHttpUrl["GetDigitalWallet"] = "/digital-wallets/";
    CashbackHttpUrl["GetToken"] = "/users/";
    return CashbackHttpUrl;
  }({});
  var MyCreditsAPI = exports.MyCreditsAPI = new (_$$_REQUIRE(_dependencyMap[0]).HttpService)(_$$_REQUIRE(_dependencyMap[1]).creditsInstance);
