  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cashbackService = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var cashbackService = exports.cashbackService = {
    getToken: function () {
      var _getToken = (0, _asyncToGenerator2.default)(function* (cpf, installationToken) {
        return _$$_REQUIRE(_dependencyMap[2]).cashbackInstance.post('/loyalty/modify-token', {
          cpf: cpf,
          installationToken: installationToken
        });
      });
      function getToken(_x, _x2) {
        return _getToken.apply(this, arguments);
      }
      return getToken;
    }(),
    acceptLoyalty: function () {
      var _acceptLoyalty = (0, _asyncToGenerator2.default)(function* (cpf) {
        return _$$_REQUIRE(_dependencyMap[2]).cashbackInstance.post('/loyalty/accept-loyalty', {
          cpf: cpf
        });
      });
      function acceptLoyalty(_x3) {
        return _acceptLoyalty.apply(this, arguments);
      }
      return acceptLoyalty;
    }(),
    getCustomer: function () {
      var _getCustomer = (0, _asyncToGenerator2.default)(function* (cpf) {
        return _$$_REQUIRE(_dependencyMap[2]).cashbackInstance.get('/loyalty/customer', {
          params: {
            cpf: cpf
          }
        });
      });
      function getCustomer(_x4) {
        return _getCustomer.apply(this, arguments);
      }
      return getCustomer;
    }()
  };
