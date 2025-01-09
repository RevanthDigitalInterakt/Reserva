  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.deepLinkHelper = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var deepLinkHelper = exports.deepLinkHelper = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (initialUrl) {
      var url = (0, _$$_REQUIRE(_dependencyMap[2]).removeLastCharacterSlash)(initialUrl);
      var route = yield _$$_REQUIRE(_dependencyMap[3]).registerMethods.reduce(/*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)(function* (accPromise, executeDeepLinkCase) {
          var acc = yield accPromise;
          if (acc.match) return acc;
          var result = yield executeDeepLinkCase(url);
          return result.match ? result : acc;
        });
        return function (_x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }(), Promise.resolve({
        match: false
      }));
      return route.match ? route.strUrl : undefined;
    });
    return function deepLinkHelper(_x) {
      return _ref.apply(this, arguments);
    };
  }();
