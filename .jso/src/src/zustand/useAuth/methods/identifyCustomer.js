  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.identifyCustomer = identifyCustomer;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var CryptType = /*#__PURE__*/function (CryptType) {
    CryptType[CryptType["SHA256"] = 3] = "SHA256";
    return CryptType;
  }(CryptType || {});
  function identifyCustomer(_x) {
    return _identifyCustomer.apply(this, arguments);
  }
  function _identifyCustomer() {
    _identifyCustomer = (0, _asyncToGenerator2.default)(function* (user) {
      var emailHash = yield (0, _$$_REQUIRE(_dependencyMap[3]).sha256)(user.email);
      _EventProvider.default.setPushExternalUserId(user.email);
      _EventProvider.default.appsFlyer.logEvent('af_login', {}, function () {}, function (error) {
        _$$_REQUIRE(_dependencyMap[4]).ExceptionProvider.captureException(error);
      });
      _EventProvider.default.appsFlyer.setUserEmails({
        emails: [emailHash],
        emailsCryptType: CryptType.SHA256
      }, function () {}, function (error) {
        _$$_REQUIRE(_dependencyMap[4]).ExceptionProvider.captureException(error);
      });
      _$$_REQUIRE(_dependencyMap[4]).ExceptionProvider.setUser(user);
    });
    return _identifyCustomer.apply(this, arguments);
  }
