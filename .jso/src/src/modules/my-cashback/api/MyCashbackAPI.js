  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MyCashbackAPI = exports.CashbackHttpUrl = undefined;
  var CashbackHttpUrl = exports.CashbackHttpUrl = /*#__PURE__*/function (CashbackHttpUrl) {
    CashbackHttpUrl["GetCustomer"] = "/loyalty/customer";
    CashbackHttpUrl["AcceptLoyalty"] = "/loyalty/accept-loyalty";
    CashbackHttpUrl["ModifyToken"] = "/loyalty/modify-token";
    CashbackHttpUrl["GetToken"] = "/users/";
    return CashbackHttpUrl;
  }({});
  var MyCashbackAPI = exports.MyCashbackAPI = new (_$$_REQUIRE(_dependencyMap[0]).HttpService)(_$$_REQUIRE(_dependencyMap[1]).cashbackInstance);
