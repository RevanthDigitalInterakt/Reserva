  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.deeplinkService = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _axios = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var deeplinkService = exports.deeplinkService = {
    getCategory: function () {
      var _getCategory = (0, _asyncToGenerator2.default)(function* (deepLink) {
        try {
          var response = yield _axios.default.get(`https://www.usereserva.com/${deepLink}?/&__siteEditor=true&__pickRuntime=extensions,page,pages,route,runtimeMeta`);
          return response.data;
        } catch (error) {
          _$$_REQUIRE(_dependencyMap[3]).ExceptionProvider.captureException(error);
        }
        return undefined;
      });
      function getCategory(_x) {
        return _getCategory.apply(this, arguments);
      }
      return getCategory;
    }()
  };
