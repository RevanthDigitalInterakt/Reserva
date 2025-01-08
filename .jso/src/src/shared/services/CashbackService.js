  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CashbackService = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _classCallCheck2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _createClass2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var CashbackService = exports.CashbackService = /*#__PURE__*/function () {
    function CashbackService() {
      (0, _classCallCheck2.default)(this, CashbackService);
      this.http = _$$_REQUIRE(_dependencyMap[4]).cashbackInstance;
    }
    return (0, _createClass2.default)(CashbackService, [{
      key: "getToken",
      value: function () {
        var _getToken = (0, _asyncToGenerator2.default)(function* (cpf, installationToken) {
          var response = yield this.http.post('/loyalty/modify-token', {
            cpf: cpf,
            installationToken: installationToken
          });
          return response;
        });
        function getToken(_x, _x2) {
          return _getToken.apply(this, arguments);
        }
        return getToken;
      }()
    }, {
      key: "acceptLoyalty",
      value: function () {
        var _acceptLoyalty = (0, _asyncToGenerator2.default)(function* (cpf) {
          var response = yield this.http.post('/loyalty/accept-loyalty', {
            cpf: cpf
          });
          return response;
        });
        function acceptLoyalty(_x3) {
          return _acceptLoyalty.apply(this, arguments);
        }
        return acceptLoyalty;
      }()
    }, {
      key: "getCustomer",
      value: function () {
        var _getCustomer = (0, _asyncToGenerator2.default)(function* (cpf) {
          var response = yield this.http.get('/loyalty/customer', {
            params: {
              cpf: cpf
            }
          });
          return response;
        });
        function getCustomer(_x4) {
          return _getCustomer.apply(this, arguments);
        }
        return getCustomer;
      }()
    }]);
  }();
